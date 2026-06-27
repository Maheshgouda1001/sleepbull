import type { CookieOptions } from 'express';
import { env } from './env';

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: env.COOKIE_SAME_SITE,
  domain: env.COOKIE_DOMAIN || undefined,
  path: '/',
  maxAge: 24 * 60 * 60 * 1000
};
