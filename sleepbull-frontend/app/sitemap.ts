import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sleepbull.com";

  return [
    {
      url: baseUrl,
      priority: 1,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      priority: 0.9,
    },
  ];
}