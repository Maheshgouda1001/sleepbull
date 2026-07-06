/*
  Warnings:

  - You are about to drop the column `coverImage` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `logoPath` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `bannerPath` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryTypeId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `category_types` table. All the data in the column will be lost.
  - You are about to drop the column `iconPath` on the `category_types` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `category_types` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `category_types` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category_types` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `contact_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `contact_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `categoryTypeId` on the `fabrics` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `fabrics` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `fabrics` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `fabrics` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPath` on the `fabrics` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fabrics` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `faqs` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `faqs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `newsletter_subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `isSubscribed` on the `newsletter_subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `unsubscribedAt` on the `newsletter_subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `grandTotal` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `fabricId` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product_cover_images` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `product_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `product_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_specifications` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `product_specifications` table. All the data in the column will be lost.
  - You are about to drop the column `compareAtPrice` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `heightInch` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `lengthCm` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `widthCm` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `compareAtPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isBestSeller` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isNewArrival` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `trialDays` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `warrantyYears` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,fabric_id]` on the table `product_cover_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cart_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_type_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `category_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_type_id` to the `fabrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_path` to the `fabrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `fabrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_email` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grand_total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fabric_id` to the `product_cover_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_path` to the `product_cover_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_cover_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_cover_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_path` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `product_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_specifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_variantId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_categoryTypeId_fkey";

-- DropForeignKey
ALTER TABLE "fabrics" DROP CONSTRAINT "fabrics_categoryTypeId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_cover_images" DROP CONSTRAINT "product_cover_images_fabricId_fkey";

-- DropForeignKey
ALTER TABLE "product_cover_images" DROP CONSTRAINT "product_cover_images_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_specifications" DROP CONSTRAINT "product_specifications_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brandId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropIndex
DROP INDEX "cart_items_cartId_idx";

-- DropIndex
DROP INDEX "cart_items_productId_idx";

-- DropIndex
DROP INDEX "cart_items_variantId_idx";

-- DropIndex
DROP INDEX "carts_sessionId_key";

-- DropIndex
DROP INDEX "carts_userId_key";

-- DropIndex
DROP INDEX "categories_categoryTypeId_idx";

-- DropIndex
DROP INDEX "fabrics_categoryTypeId_idx";

-- DropIndex
DROP INDEX "orders_orderNumber_key";

-- DropIndex
DROP INDEX "product_cover_images_fabricId_idx";

-- DropIndex
DROP INDEX "product_cover_images_productId_fabricId_key";

-- DropIndex
DROP INDEX "product_cover_images_productId_idx";

-- DropIndex
DROP INDEX "products_brandId_idx";

-- DropIndex
DROP INDEX "products_categoryId_idx";

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "coverImage",
DROP COLUMN "createdAt",
DROP COLUMN "isPublished",
DROP COLUMN "publishedAt",
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "brands" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "logoPath",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "logo_path" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "cartId",
DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
DROP COLUMN "variantId",
ADD COLUMN     "cart_id" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "variant_id" BIGINT;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "createdAt",
DROP COLUMN "sessionId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "session_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" BIGINT;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "bannerPath",
DROP COLUMN "categoryTypeId",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "imagePath",
DROP COLUMN "isActive",
DROP COLUMN "sortOrder",
DROP COLUMN "updatedAt",
ADD COLUMN     "banner_path" TEXT,
ADD COLUMN     "category_type_id" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "image_path" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "category_types" DROP COLUMN "createdAt",
DROP COLUMN "iconPath",
DROP COLUMN "isActive",
DROP COLUMN "sortOrder",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "icon_path" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "contact_enquiries" DROP COLUMN "createdAt",
DROP COLUMN "isRead",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "fabrics" DROP COLUMN "categoryTypeId",
DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "sortOrder",
DROP COLUMN "thumbnailPath",
DROP COLUMN "updatedAt",
ADD COLUMN     "category_type_id" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbnail_path" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "faqs" DROP COLUMN "isActive",
DROP COLUMN "sortOrder",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "newsletter_subscribers" DROP COLUMN "createdAt",
DROP COLUMN "isSubscribed",
DROP COLUMN "unsubscribedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_subscribed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unsubscribed_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "orderId",
DROP COLUMN "productId",
DROP COLUMN "unitPrice",
ADD COLUMN     "order_id" BIGINT NOT NULL,
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "unit_price" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "createdAt",
DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "grandTotal",
DROP COLUMN "orderNumber",
DROP COLUMN "paymentStatus",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_email" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "grand_total" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "order_number" TEXT NOT NULL,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "product_cover_images" DROP COLUMN "altText",
DROP COLUMN "createdAt",
DROP COLUMN "fabricId",
DROP COLUMN "imagePath",
DROP COLUMN "isDefault",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
ADD COLUMN     "alt_text" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fabric_id" BIGINT NOT NULL,
ADD COLUMN     "image_path" TEXT NOT NULL,
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "altText",
DROP COLUMN "imagePath",
DROP COLUMN "productId",
DROP COLUMN "sortOrder",
ADD COLUMN     "alt_text" TEXT,
ADD COLUMN     "image_path" TEXT NOT NULL,
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "product_reviews" DROP COLUMN "createdAt",
DROP COLUMN "customerName",
DROP COLUMN "isApproved",
DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "product_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "product_specifications" DROP COLUMN "productId",
DROP COLUMN "sortOrder",
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "compareAtPrice",
DROP COLUMN "createdAt",
DROP COLUMN "heightInch",
DROP COLUMN "isActive",
DROP COLUMN "isDefault",
DROP COLUMN "lengthCm",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
DROP COLUMN "widthCm",
ADD COLUMN     "compare_at_price" DECIMAL(10,2),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "height_inch" INTEGER,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "length_cm" INTEGER,
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "width_cm" INTEGER;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "basePrice",
DROP COLUMN "brandId",
DROP COLUMN "categoryId",
DROP COLUMN "compareAtPrice",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "isActive",
DROP COLUMN "isBestSeller",
DROP COLUMN "isFeatured",
DROP COLUMN "isNewArrival",
DROP COLUMN "shortDescription",
DROP COLUMN "trialDays",
DROP COLUMN "updatedAt",
DROP COLUMN "warrantyYears",
ADD COLUMN     "base_price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "brand_id" BIGINT,
ADD COLUMN     "category_id" BIGINT NOT NULL,
ADD COLUMN     "compare_at_price" DECIMAL(10,2),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_best_seller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_new_arrival" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "short_description" TEXT,
ADD COLUMN     "trial_days" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warranty_years" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "testimonials" DROP COLUMN "imagePath",
ADD COLUMN     "image_path" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "isActive",
DROP COLUMN "passwordHash",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "cart_items_cart_id_idx" ON "cart_items"("cart_id");

-- CreateIndex
CREATE INDEX "cart_items_product_id_idx" ON "cart_items"("product_id");

-- CreateIndex
CREATE INDEX "cart_items_variant_id_idx" ON "cart_items"("variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_session_id_key" ON "carts"("session_id");

-- CreateIndex
CREATE INDEX "categories_category_type_id_idx" ON "categories"("category_type_id");

-- CreateIndex
CREATE INDEX "fabrics_category_type_id_idx" ON "fabrics"("category_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "product_cover_images_product_id_idx" ON "product_cover_images"("product_id");

-- CreateIndex
CREATE INDEX "product_cover_images_fabric_id_idx" ON "product_cover_images"("fabric_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_cover_images_product_id_fabric_id_key" ON "product_cover_images"("product_id", "fabric_id");

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- CreateIndex
CREATE INDEX "products_brand_id_idx" ON "products"("brand_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "category_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fabrics" ADD CONSTRAINT "fabrics_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "category_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cover_images" ADD CONSTRAINT "product_cover_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cover_images" ADD CONSTRAINT "product_cover_images_fabric_id_fkey" FOREIGN KEY ("fabric_id") REFERENCES "fabrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_specifications" ADD CONSTRAINT "product_specifications_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
