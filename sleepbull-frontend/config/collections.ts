export const CATEGORY_TYPE_IDS = {
  mattresses: "1",
  pillows: "2",
  accessories: "3",
} as const;

export type CollectionSlug = keyof typeof CATEGORY_TYPE_IDS;

export const COLLECTIONS: Record<
  CollectionSlug,
  {
    title: string;
    description: string;
    href: string;
  }
> = {
  mattresses: {
    title: "Mattresses",
    description:
      "Premium comfort, orthopedic, latex, and spring mattresses for restorative sleep.",
    href: "/categories/mattresses",
  },
  pillows: {
    title: "Pillows",
    description:
      "Memory foam, latex, and fiber pillows designed for neck support and comfort.",
    href: "/categories/pillows",
  },
  accessories: {
    title: "Accessories",
    description: "Pillow covers and sleep accessories to complete your setup.",
    href: "/categories/accessories",
  },
};

export function isCollectionSlug(slug: string): slug is CollectionSlug {
  return slug in CATEGORY_TYPE_IDS;
}
