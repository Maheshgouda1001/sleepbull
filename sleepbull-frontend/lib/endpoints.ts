export const ENDPOINTS = {
  // Health — GET /health
  HEALTH: "/health",

  // Auth
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",
  CHANGE_PASSWORD: "/auth/change-password",

  // Categories
  CATEGORIES: "/categories",
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,

  // Products
  PRODUCTS: "/products",
  PRODUCT_BY_SLUG: (slug: string) => `/products/${slug}`,

  // Blogs
  BLOGS: "/blogs",
  BLOG_BY_SLUG: (slug: string) => `/blogs/${slug}`,

  // FAQs
  FAQS: "/faqs",
  FAQ_BY_ID: (id: string) => `/faqs/${id}`,

  // Testimonials
  TESTIMONIALS: "/testimonials",
  TESTIMONIAL_BY_ID: (id: string) => `/testimonials/${id}`,

  // Orders (admin auth required)
  ORDERS: "/orders",
  ORDER_BY_ID: (id: string) => `/orders/${id}`,

  // Public
  CONTACT: "/public/contact",
  NEWSLETTER: "/public/newsletter",
  NEWSLETTER_UNSUBSCRIBE: "/public/newsletter/unsubscribe",

  // Meta
  META: "/meta",
} as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://13.55.55.13:4000/api";

export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://13.55.55.13:4000";

export const HEALTH_URL =
  process.env.NEXT_PUBLIC_API_BASE
    ? `${process.env.NEXT_PUBLIC_API_BASE}/health`
    : "http://13.55.55.13:4000/health";
