/**
 * SleepBull Frontend — Backend API integration map
 *
 * Base URL: NEXT_PUBLIC_API_URL (default http://localhost:4000/api)
 *
 * Public read APIs:
 * - GET  /health
 * - GET  /api/categories
 * - GET  /api/categories/:id
 * - GET  /api/products
 * - GET  /api/products/:slugOrId
 * - GET  /api/blogs
 * - GET  /api/blogs/:idOrSlug
 * - GET  /api/faqs
 * - GET  /api/testimonials
 * - GET  /api/meta
 *
 * Public write APIs:
 * - POST /api/public/contact
 * - POST /api/public/newsletter
 * - POST /api/public/newsletter/unsubscribe
 *
 * Auth APIs (cookie-based):
 * - POST /api/auth/login
 * - POST /api/auth/logout
 * - GET  /api/auth/profile
 * - POST /api/auth/change-password
 *
 * Admin APIs (auth required):
 * - CRUD /api/categories, /api/products, /api/orders, /api/blogs, /api/faqs, /api/testimonials
 */

export { getCategories, getCategoryById, getCategoryBySlug } from "./category.service";
export { getFeaturedProducts, getAllMattresses, getProductsByCategory, getProduct, getRelatedProducts, searchProducts } from "./product.service";
export { getBlogs, getBlog } from "./blog.service";
export { getFaqs } from "./faq.service";
export { getTestimonials } from "./testimonial.service";
export { getApiMeta } from "./meta.service";
export { submitContact, subscribeNewsletter, unsubscribeNewsletter } from "./public.service";
export { login, logout, getProfile, getProfileClient, changePassword } from "./auth.service";
export { checkApiHealth } from "./health.service";
