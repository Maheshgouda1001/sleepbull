/*
  Warnings:

  - Added the required column `categoryTypeId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_isActive_sortOrder_idx";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "categoryTypeId" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "category_types" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "iconPath" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_types_slug_key" ON "category_types"("slug");

-- CreateIndex
CREATE INDEX "categories_categoryTypeId_idx" ON "categories"("categoryTypeId");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
