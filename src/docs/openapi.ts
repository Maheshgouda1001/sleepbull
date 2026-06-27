export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Sleepbull API',
    version: '1.0.0',
    description: 'Backend API for the Sleepbull mattress e-commerce MVP.'
  },
  servers: [{ url: '/api' }],
  tags: [
    { name: 'Health' },
    { name: 'Authentication' },
    { name: 'Categories' },
    { name: 'Products' },
    { name: 'Product Variants' },
    { name: 'Product Images' },
    { name: 'Orders' },
    { name: 'Blogs' },
    { name: 'FAQs' },
    { name: 'Testimonials' },
    { name: 'Public' }
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'sleepbull_token'
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Healthy service'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login and set auth cookie'
      }
    },
    '/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'Logout and clear auth cookie',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/auth/profile': {
      get: {
        tags: ['Authentication'],
        summary: 'Get current profile',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/auth/change-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Change current user password',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: 'List categories'
      },
      post: {
        tags: ['Categories'],
        summary: 'Create category',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Get category by id'
      },
      put: {
        tags: ['Categories'],
        summary: 'Update category',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['Categories'],
        summary: 'Soft delete category',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'List products with pagination, search, filters, and sorting'
      },
      post: {
        tags: ['Products'],
        summary: 'Create product',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products/{slugOrId}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by slug or id'
      }
    },
    '/products/{id}': {
      put: {
        tags: ['Products'],
        summary: 'Update product',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['Products'],
        summary: 'Soft delete product',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products/{productId}/variants': {
      post: {
        tags: ['Product Variants'],
        summary: 'Create product variant',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products/variants/{id}': {
      put: {
        tags: ['Product Variants'],
        summary: 'Update product variant',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['Product Variants'],
        summary: 'Soft delete product variant',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products/{productId}/images': {
      post: {
        tags: ['Product Images'],
        summary: 'Upload product image',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products/images/{id}': {
      delete: {
        tags: ['Product Images'],
        summary: 'Delete product image',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/products/{productId}/images/reorder': {
      post: {
        tags: ['Product Images'],
        summary: 'Reorder product images',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'List orders',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      post: {
        tags: ['Orders'],
        summary: 'Create order',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order by id',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      put: {
        tags: ['Orders'],
        summary: 'Update order',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['Orders'],
        summary: 'Soft delete order',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/blogs': {
      get: {
        tags: ['Blogs'],
        summary: 'List blogs'
      },
      post: {
        tags: ['Blogs'],
        summary: 'Create blog',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/blogs/{id}': {
      get: {
        tags: ['Blogs'],
        summary: 'Get blog by id'
      },
      put: {
        tags: ['Blogs'],
        summary: 'Update blog',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['Blogs'],
        summary: 'Soft delete blog',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/faqs': {
      get: {
        tags: ['FAQs'],
        summary: 'List FAQs'
      },
      post: {
        tags: ['FAQs'],
        summary: 'Create FAQ',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/faqs/{id}': {
      get: {
        tags: ['FAQs'],
        summary: 'Get FAQ by id'
      },
      put: {
        tags: ['FAQs'],
        summary: 'Update FAQ',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['FAQs'],
        summary: 'Soft delete FAQ',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/testimonials': {
      get: {
        tags: ['Testimonials'],
        summary: 'List testimonials'
      },
      post: {
        tags: ['Testimonials'],
        summary: 'Create testimonial',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/testimonials/{id}': {
      get: {
        tags: ['Testimonials'],
        summary: 'Get testimonial by id'
      },
      put: {
        tags: ['Testimonials'],
        summary: 'Update testimonial',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      },
      delete: {
        tags: ['Testimonials'],
        summary: 'Soft delete testimonial',
        security: [{ cookieAuth: [] }, { bearerAuth: [] }]
      }
    },
    '/public/contact': {
      post: {
        tags: ['Public'],
        summary: 'Submit contact enquiry'
      }
    },
    '/public/newsletter': {
      post: {
        tags: ['Public'],
        summary: 'Subscribe to newsletter'
      }
    },
    '/public/newsletter/unsubscribe': {
      post: {
        tags: ['Public'],
        summary: 'Unsubscribe from newsletter'
      }
    }
  }
};
