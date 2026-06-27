/** @deprecated Use lib/fetcher.ts */
import { fetcher, poster } from "./fetcher";

const api = {
  get: <T>(url: string) => fetcher<T>(url).then((data) => ({ data: { data } })),
  post: <T>(url: string, body: unknown) =>
    poster<T>(url, body).then((data) => ({ data: { data } })),
};

export default api;
