import { HEALTH_URL } from "@/lib/endpoints";

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(HEALTH_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return false;

    const payload = await response.json();
    return payload?.success === true;
  } catch {
    return false;
  }
}
