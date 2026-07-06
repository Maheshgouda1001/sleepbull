/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "order_id",
DROP COLUMN "product_id",
DROP COLUMN "unit_price",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fabricId" BIGINT,
ADD COLUMN     "fabricName" TEXT,
ADD COLUMN     "orderId" BIGINT NOT NULL,
ADD COLUMN     "productId" BIGINT NOT NULL,
ADD COLUMN     "productImage" TEXT,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "variantId" BIGINT,
ADD COLUMN     "variantName" TEXT;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "fabrics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
