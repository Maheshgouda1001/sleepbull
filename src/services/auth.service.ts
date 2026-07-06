import createHttpError from 'http-errors';
import { UserRole } from '@prisma/client';
import crypto from 'crypto';
import https from 'https';
import { env } from '../config/env';
import { UserRepository } from '../repositories/user.repository';
import { parseBigIntId } from '../utils/id';
import { comparePassword, hashPassword } from '../utils/password';
import { signAccessToken } from '../utils/jwt';

type GoogleJwtHeader = {
  alg: string;
  kid: string;
  typ?: string;
};

type GoogleJwtPayload = {
  aud: string;
  email?: string;
  email_verified?: boolean | string;
  exp: number;
  iss: string;
  name?: string;
};

type GoogleJwk = crypto.JsonWebKey & {
  kid: string;
  alg: string;
};

let googleKeysCache: {
  expiresAt: number;
  keys: GoogleJwk[];
} | null = null;

function decodeBase64UrlJson<T>(value: string): T {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;
}

function fetchGoogleKeys(): Promise<GoogleJwk[]> {
  if (googleKeysCache && googleKeysCache.expiresAt > Date.now()) {
    return Promise.resolve(googleKeysCache.keys);
  }

  return new Promise((resolve, reject) => {
    https
      .get('https://www.googleapis.com/oauth2/v3/certs', (response) => {
        const chunks: Buffer[] = [];

        response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        response.on('end', () => {
          if (!response.statusCode || response.statusCode >= 400) {
            reject(createHttpError(502, 'Unable to fetch Google sign-in keys'));
            return;
          }

          const maxAge = /max-age=(\d+)/.exec(String(response.headers['cache-control'] || ''))?.[1];
          const payload = JSON.parse(Buffer.concat(chunks).toString('utf8')) as { keys: GoogleJwk[] };

          googleKeysCache = {
            keys: payload.keys,
            expiresAt: Date.now() + Number(maxAge || 3600) * 1000
          };

          resolve(payload.keys);
        });
      })
      .on('error', () => reject(createHttpError(502, 'Unable to verify Google sign-in')));
  });
}

async function verifyGoogleCredential(credential: string): Promise<GoogleJwtPayload> {
  if (!env.GOOGLE_CLIENT_ID) {
    throw createHttpError(500, 'Google login is not configured');
  }

  const [encodedHeader, encodedPayload, encodedSignature] = credential.split('.');

  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw createHttpError(401, 'Invalid Google credential');
  }

  const header = decodeBase64UrlJson<GoogleJwtHeader>(encodedHeader);
  const payload = decodeBase64UrlJson<GoogleJwtPayload>(encodedPayload);

  if (header.alg !== 'RS256') {
    throw createHttpError(401, 'Invalid Google credential algorithm');
  }

  const keys = await fetchGoogleKeys();
  const key = keys.find((candidate) => candidate.kid === header.kid);

  if (!key) {
    throw createHttpError(401, 'Invalid Google credential key');
  }

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${encodedHeader}.${encodedPayload}`);
  verifier.end();

  const publicKey = crypto.createPublicKey({ key: key as crypto.JsonWebKey, format: 'jwk' });
  const isValid = verifier.verify(publicKey, Buffer.from(encodedSignature, 'base64url'));

  if (!isValid) {
    throw createHttpError(401, 'Invalid Google credential signature');
  }

  if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) {
    throw createHttpError(401, 'Invalid Google credential issuer');
  }

  if (payload.aud !== env.GOOGLE_CLIENT_ID) {
    throw createHttpError(401, 'Invalid Google credential audience');
  }

  if (payload.exp * 1000 <= Date.now()) {
    throw createHttpError(401, 'Google credential expired');
  }

  if (!payload.email || payload.email_verified !== true) {
    throw createHttpError(401, 'Google account email is not verified');
  }

  return payload;
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = (await this.userRepository.findByEmail(email)) as any;

    if (!user || user.deletedAt || !user.isActive) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const token = signAccessToken({
      id: String(user.id),
      email: user.email,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async googleLogin(credential: string) {
    const googleProfile = await verifyGoogleCredential(credential);
    const email = googleProfile.email!.toLowerCase();
    let user = (await this.userRepository.findByEmail(email)) as any;

    if (user?.deletedAt || user?.isActive === false) {
      throw createHttpError(401, 'This account is not active');
    }

    if (!user) {
      user = await this.userRepository.create({
        email,
        name: googleProfile.name || email.split('@')[0],
        passwordHash: await hashPassword(crypto.randomBytes(24).toString('hex')),
        role: 'CUSTOMER' as UserRole
      });
    }

    const token = signAccessToken({
      id: String(user.id),
      email: user.email,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }

  async getProfile(userId: string) {
    const user = (await this.userRepository.findUnique({
      id: parseBigIntId(userId),
      deletedAt: null
    })) as any;
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = (await this.userRepository.findUnique({
      id: parseBigIntId(userId),
      deletedAt: null
    })) as any;
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const isMatch = await comparePassword(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw createHttpError(400, 'Current password is incorrect');
    }

    const passwordHash = await hashPassword(newPassword);

    await this.userRepository.update({ id: user.id }, { passwordHash });
  }

  async bootstrapAdminIfNeeded() {
    const existingAdmin = await this.userRepository.findByEmail('admin@sleepbull.com');
    if (!existingAdmin) {
      await this.userRepository.create({
        email: 'admin@sleepbull.com',
        name: 'Sleepbull Admin',
        passwordHash: await hashPassword('Admin@12345'),
        role: UserRole.SUPER_ADMIN
      });
    }
  }
}
