export interface AuthUser {
  id: string;

  name?: string;
  firstName?: string;
  lastName?: string;

  email: string;
  phone?: string;

  profileImage?: string;

  role: "CUSTOMER" | "ADMIN" | "EDITOR" | "SUPER_ADMIN";

  authProvider: "EMAIL" | "GOOGLE";

  googleId?: string;

  isEmailVerified: boolean;
  isPhoneVerified: boolean;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface GoogleLoginPayload {
  credential: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
