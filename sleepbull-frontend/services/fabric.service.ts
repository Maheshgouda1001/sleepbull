import { fetcher, safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import { resolveAssetUrl } from "@/lib/mappers";
import type { ApiFabric } from "@/lib/api-types";
import type { ProductFabric } from "@/types/product";

function mapFabric(fabric: ApiFabric): ProductFabric {
  return {
    id: String(fabric.id),
    name: fabric.name,
    slug: fabric.slug,
    thumbnail: resolveAssetUrl(fabric.thumbnailPath),
    description: fabric.description ?? undefined,
  };
}

/** GET /api/fabrics?categoryTypeId=... */
export async function getFabricsByCategoryType(
  categoryTypeId: string
): Promise<ProductFabric[]> {
  const params = new URLSearchParams({ categoryTypeId });
  const fabrics = await safeFetcher<ApiFabric[]>(
    `${ENDPOINTS.FABRICS}?${params.toString()}`,
    []
  );

  return fabrics.map(mapFabric);
}

/** GET /api/fabrics/:id */
export async function getFabricById(id: string): Promise<ProductFabric | null> {
  try {
    const fabric = await fetcher<ApiFabric>(ENDPOINTS.FABRIC_BY_ID(id));
    return mapFabric(fabric);
  } catch {
    return null;
  }
}
