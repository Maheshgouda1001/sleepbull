import { fetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";

export interface ApiMeta {
  brand: {
    name: string;
    theme: {
      primary: string;
      accent: string;
      surface: string;
      ink: string;
    };
    logoUrl: string;
    markUrl: string;
  };
  roles: string[];
}

export async function getApiMeta(): Promise<ApiMeta | null> {
  try {
    return await fetcher<ApiMeta>(ENDPOINTS.META);
  } catch {
    return null;
  }
}
