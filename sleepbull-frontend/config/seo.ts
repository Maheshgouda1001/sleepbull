import { Metadata } from "next";
import { siteConfig } from "./site";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
}: SEOProps): Metadata {
  const seoTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;

  const seoDescription =
    description || siteConfig.description;

  const seoImage = image || siteConfig.ogImage;

  const seoUrl = url
    ? `${siteConfig.url}${url}`
    : siteConfig.url;

  return {
    title: seoTitle,

    description: seoDescription,

    keywords: keywords || siteConfig.keywords,

    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: seoUrl,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
  };
}