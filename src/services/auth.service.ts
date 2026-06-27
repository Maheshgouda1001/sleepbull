import createHttpError from 'http-errors';
import { UserRole } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { comparePassword, hashPassword } from '../utils/password';
import { signAccessToken } from '../utils/jwt';

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
      id: user.id,
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

  async getProfile(userId: string) {
    const user = (await this.userRepository.findUnique({ id: userId, deletedAt: null })) as any;
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
    const user = (await this.userRepository.findUnique({ id: userId, deletedAt: null })) as any;
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
