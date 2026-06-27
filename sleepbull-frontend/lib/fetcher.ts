import type { ApiResponse } from "@/types/api";
import { buildBackendUrl } from "./get-api-url";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || payload.success === false) {
    throw new ApiError(payload.message ?? "Request failed", response.status);
  }

  return payload.data;
}

/** GET from Node backend at localhost:4000/api */
export async function fetcher<T>(path: string): Promise<T> {
  const url = buildBackendUrl(path);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  return parseResponse<T>(response);
}

/** POST to Node backend at localhost:4000/api */
export async function poster<T>(
  path: string,
  body: unknown
): Promise<T> {
  const url = buildBackendUrl(path);

  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return parseResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      error instanceof Error ? error.message : "Request failed"
    );
  }
}

export async function safeFetcher<T>(
  path: string,
  fallback: T
): Promise<T> {
  try {
    return await fetcher<T>(path);
  } catch (error) {
    console.error(`[SleepBull API] GET ${buildBackendUrl(path)} failed:`, error);
    return fallback;
  }
}
