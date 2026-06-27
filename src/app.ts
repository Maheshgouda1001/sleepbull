import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { UserRole } from '@prisma/client';
import { env } from './config/env';
import { requestLogger } from './middleware/request-logger';
import { errorHandler } from './middleware/error-handler';
import { notFoundHandler } from './middleware/not-found';
import { sendSuccess } from './utils/response';
import { openApiDocument } from './docs/openapi';
import { createStorageService } from './storage';
import { UserRepository } from './repositories/user.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { ProductImageRepository } from './repositories/product-image.repository';
import { OrderRepository } from './repositories/order.repository';
import { BlogRepository } from './repositories/blog.repository';
import { FaqRepository } from './repositories/faq.repository';
import { TestimonialRepository } from './repositories/testimonial.repository';
import { ContactEnquiryRepository } from './repositories/contact-enquiry.repository';
import { NewsletterRepository } from './repositories/newsletter.repository';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductImageService } from './services/product-image.service';
import { OrderService } from './services/order.service';
import { ContentService } from './services/content.service';
import { ContactService } from './services/contact.service';
import { NewsletterService } from './services/newsletter.service';
import { AuthController } from './controllers/auth.controller';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { ContentController } from './controllers/content.controller';
import { PublicController } from './controllers/public.controller';
import { createAuthRouter } from './routes/auth.routes';
import { createCategoryRouter } from './routes/category.routes';
import { createProductRouter } from './routes/product.routes';
import { createOrderRouter } from './routes/order.routes';
import { createContentRouter } from './routes/content.routes';
import { createPublicRouter } from './routes/public.routes';
import { blogBodySchema, faqBodySchema, testimonialBodySchema } from './validators/content.validator';

const app = express();

const storageService = createStorageService();

const userRepository = new UserRepository();
const categoryRepository = new CategoryRepository();
const productRepository = new ProductRepository();
const productVariantRepository = new ProductVariantRepository();
const productImageRepository = new ProductImageRepository();
const orderRepository = new OrderRepository();
const blogRepository = new BlogRepository();
const faqRepository = new FaqRepository();
const testimonialRepository = new TestimonialRepository();
const contactEnquiryRepository = new ContactEnquiryRepository();
const newsletterRepository = new NewsletterRepository();

const authService = new AuthService(userRepository);
const categoryService = new CategoryService(categoryRepository);
const productService = new ProductService(
  productRepository,
  productVariantRepository,
  productImageRepository
);
const productImageService = new ProductImageService(
  productImageRepository,
  productRepository,
  storageService
);
const orderService = new OrderService(orderRepository, productRepository, productVariantRepository);
const blogService = new ContentService(blogRepository, { slug: true });
const faqService = new ContentService(faqRepository);
const testimonialService = new ContentService(testimonialRepository);
const contactService = new ContactService(contactEnquiryRepository);
const newsletterService = new NewsletterService(newsletterRepository);

const authController = new AuthController(authService);
const categoryController = new CategoryController(categoryService);
const productController = new ProductController(productService, productImageService);
const orderController = new OrderController(orderService);
const blogController = new ContentController(blogService, 'Blogs');
const faqController = new ContentController(faqService, 'FAQs');
const testimonialController = new ContentController(testimonialService, 'Testimonials');
const publicController = new PublicController(contactService, newsletterService);

app.use(requestLogger);
app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigins,
    credentials: true
  })
);
app.use(
  rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));
app.use('/public', express.static(path.resolve(process.cwd(), 'public')));

app.get('/health', (_req, res) => {
  return sendSuccess(res, 'Sleepbull API is healthy', {
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    customCssUrl: '/public/swagger-theme.css',
    customSiteTitle: 'Sleepbull API Docs',
    customfavIcon: '/public/sleepbull-mark.svg'
  })
);

app.use('/api/auth', createAuthRouter(authController));
app.use('/api/categories', createCategoryRouter(categoryController));
app.use('/api/products', createProductRouter(productController));
app.use('/api/orders', createOrderRouter(orderController));
app.use('/api/blogs', createContentRouter(blogController, blogBodySchema));
app.use('/api/faqs', createContentRouter(faqController, faqBodySchema));
app.use('/api/testimonials', createContentRouter(testimonialController, testimonialBodySchema));
app.use('/api/public', createPublicRouter(publicController));

app.get('/api/meta', (_req, res) =>
  sendSuccess(res, 'Sleepbull API metadata fetched successfully', {
    brand: {
      name: 'Sleepbull',
      theme: {
        primary: '#1f6f78',
        accent: '#f4a261',
        surface: '#f8f5f0',
        ink: '#1d2a33'
      },
      logoUrl: '/public/sleepbull-logo.svg',
      markUrl: '/public/sleepbull-mark.svg'
    },
    roles: Object.values(UserRole)
  })
);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
