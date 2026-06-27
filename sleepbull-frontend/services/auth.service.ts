import { fetcher, poster } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import type {
  AuthUser,
  ChangePasswordPayload,
  LoginPayload,
} from "@/types/auth";

export async function login(payload: LoginPayload): Promise<AuthUser> {
  return poster<AuthUser>(ENDPOINTS.LOGIN, payload);
}

export async function logout(): Promise<void> {
  await poster<Record<string, never>>(ENDPOINTS.LOGOUT, {});
}

export async function getProfile(): Promise<AuthUser | null> {
  try {
    return await fetcher<AuthUser>(ENDPOINTS.PROFILE);
  } catch {
    return null;
  }
}

export async function getProfileClient(): Promise<AuthUser | null> {
  return getProfile();
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<void> {
  await poster<Record<string, never>>(
    ENDPOINTS.CHANGE_PASSWORD,
    payload
  );
}
