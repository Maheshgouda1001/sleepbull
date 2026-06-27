import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@12345', 12);

  await prisma.user.upsert({
    where: { email: 'admin@sleepbull.com' },
    update: {},
    create: {
      email: 'admin@sleepbull.com',
      name: 'Sleepbull Admin',
      passwordHash,
      role: UserRole.SUPER_ADMIN
    }
  });

  const comfort = await prisma.category.upsert({
    where: { slug: 'comfort-mattresses' },
    update: {},
    create: {
      name: 'Comfort Mattresses',
      slug: 'comfort-mattresses',
      description: 'Balanced comfort mattresses for everyday sleep.',
      sortOrder: 1
    }
  });

  const orthopedic = await prisma.category.upsert({
    where: { slug: 'orthopedic-mattresses' },
    update: {},
    create: {
      name: 'Orthopedic Mattresses',
      slug: 'orthopedic-mattresses',
      description: 'Support-first mattresses engineered for spinal alignment.',
      sortOrder: 2
    }
  });

  const product = await prisma.product.upsert({
    where: { slug: 'sleepbull-cloud-hybrid' },
    update: {},
    create: {
      categoryId: comfort.id,
      name: 'Sleepbull Cloud Hybrid',
      slug: 'sleepbull-cloud-hybrid',
      shortDescription: 'A plush hybrid mattress with breathable comfort layers.',
      description:
        'The Cloud Hybrid combines pocket springs, responsive foam, and cooling fabric for deep, easy rest.',
      basePrice: 49999,
      compareAtPrice: 64999,
      isFeatured: true,
      variants: {
        create: [
          { sku: 'SB-CH-QUEEN', size: 'Queen', firmness: 'Medium Plush', price: 49999, stock: 25 },
          { sku: 'SB-CH-KING', size: 'King', firmness: 'Medium Plush', price: 59999, stock: 18 }
        ]
      },
      specifications: {
        create: [
          { key: 'Comfort', value: 'Medium Plush', sortOrder: 1 },
          { key: 'Height', value: '10 inches', sortOrder: 2 },
          { key: 'Warranty', value: '10 years', sortOrder: 3 }
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'sleepbull-spine-care' },
    update: {},
    create: {
      categoryId: orthopedic.id,
      name: 'Sleepbull Spine Care',
      slug: 'sleepbull-spine-care',
      shortDescription: 'Firm orthopedic support for restorative sleep.',
      description: 'Designed for pressure relief and consistent spinal support throughout the night.',
      basePrice: 39999,
      isFeatured: true,
      variants: {
        create: [{ sku: 'SB-SC-QUEEN', size: 'Queen', firmness: 'Firm', price: 39999, stock: 30 }]
      }
    }
  });

  const existingImage = await prisma.productImage.findFirst({
    where: {
      productId: product.id,
      path: '/uploads/seed/cloud-hybrid-hero.svg'
    }
  });

  if (!existingImage) {
    await prisma.productImage.create({
      data: {
        productId: product.id,
        path: '/uploads/seed/cloud-hybrid-hero.svg',
        altText: 'Sleepbull Cloud Hybrid mattress',
        sortOrder: 1
      }
    });
  }

  const faqs = [
    {
      question: 'Do Sleepbull mattresses come with a trial?',
      answer: 'Yes, trial policies can be configured by the store team before launch.',
      category: 'Policies',
      sortOrder: 1
    },
    {
      question: 'Can I switch image storage to S3 later?',
      answer: 'Yes. Uploads go through the StorageService interface, so only the implementation changes.',
      category: 'Technology',
      sortOrder: 2
    }
  ];

  for (const faq of faqs) {
    const existingFaq = await prisma.fAQ.findFirst({
      where: { question: faq.question }
    });

    if (!existingFaq) {
      await prisma.fAQ.create({ data: faq });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
