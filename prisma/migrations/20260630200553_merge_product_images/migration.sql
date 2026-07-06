/*
  Warnings:

  - You are about to drop the `product_cover_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductImageType" AS ENUM ('COVER', 'GALLERY', 'THUMBNAIL', 'ZOOM');

-- DropForeignKey
ALTER TABLE "product_cover_images" DROP CONSTRAINT "product_cover_images_fabric_id_fkey";

-- DropForeignKey
ALTER TABLE "product_cover_images" DROP CONSTRAINT "product_cover_images_product_id_fkey";

-- AlterTable
ALTER TABLE "product_images" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fabric_id" BIGINT,
ADD COLUMN     "image_type" "ProductImageType" NOT NULL DEFAULT 'GALLERY',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "product_cover_images";

-- CreateIndex
CREATE INDEX "product_images_product_id_idx" ON "product_images"("product_id");

-- CreateIndex
CREATE INDEX "product_images_fabric_id_idx" ON "product_images"("fabric_id");

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_fabric_id_fkey" FOREIGN KEY ("fabric_id") REFERENCES "fabrics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
