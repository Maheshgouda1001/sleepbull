-- CreateTable
CREATE TABLE "fabrics" (
    "id" BIGSERIAL NOT NULL,
    "categoryTypeId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "thumbnailPath" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fabrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_cover_images" (
    "id" BIGSERIAL NOT NULL,
    "productId" BIGINT NOT NULL,
    "fabricId" BIGINT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "altText" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_cover_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fabrics_slug_key" ON "fabrics"("slug");

-- CreateIndex
CREATE INDEX "fabrics_categoryTypeId_idx" ON "fabrics"("categoryTypeId");

-- CreateIndex
CREATE INDEX "product_cover_images_productId_idx" ON "product_cover_images"("productId");

-- CreateIndex
CREATE INDEX "product_cover_images_fabricId_idx" ON "product_cover_images"("fabricId");

-- CreateIndex
CREATE UNIQUE INDEX "product_cover_images_productId_fabricId_key" ON "product_cover_images"("productId", "fabricId");

-- AddForeignKey
ALTER TABLE "fabrics" ADD CONSTRAINT "fabrics_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cover_images" ADD CONSTRAINT "product_cover_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cover_images" ADD CONSTRAINT "product_cover_images_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "fabrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
