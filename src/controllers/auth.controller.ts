import type { Request, Response } from 'express';
import { env } from '../config/env';
import { authCookieOptions } from '../config/cookies';
import { AuthService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body.email, req.body.password);
    res.cookie(env.COOKIE_NAME, result.token, authCookieOptions);
    return sendSuccess(res, 'Login successful', result.user);
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie(env.COOKIE_NAME, authCookieOptions);
    return sendSuccess(res, 'Logout successful', {});
  };

  profile = async (req: Request, res: Response) => {
    const profile = await this.authService.getProfile(req.user!.id);
    return sendSuccess(res, 'Profile fetched successfully', profile);
  };

  changePassword = async (req: Request, res: Response) => {
    await this.authService.changePassword(
      req.user!.id,
      req.body.currentPassword,
      req.body.newPassword
    );
    return sendSuccess(res, 'Password changed successfully', {});
  };
}
