/**
 * Backend API base URL.
 * GET  http://localhost:4000/api/categories
 * GET  http://localhost:4000/api/products
 * GET  http://localhost:4000/api/products/:slug
 */
export const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

export function buildBackendUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BACKEND_API_URL}${normalized}`;
}
