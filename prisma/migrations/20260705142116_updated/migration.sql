-- CreateEnum
CREATE TYPE "ReturnStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'INSPECTED', 'REFUNDED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ReturnCondition" AS ENUM ('UNOPENED', 'OPENED', 'DAMAGED', 'DEFECTIVE', 'WRONG_ITEM');

-- CreateTable
CREATE TABLE "return_requests" (
    "id" BIGSERIAL NOT NULL,
    "order_id" BIGINT NOT NULL,
    "request_number" TEXT NOT NULL,
    "reason" TEXT,
    "status" "ReturnStatus" NOT NULL DEFAULT 'PENDING',
    "refund_amount" DECIMAL(10,2),
    "customer_remarks" TEXT,
    "admin_remarks" TEXT,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "return_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "return_items" (
    "id" BIGSERIAL NOT NULL,
    "return_request_id" BIGINT NOT NULL,
    "order_item_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT,
    "condition" "ReturnCondition",
    "images" JSONB,
    "refund_amount" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "return_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "return_requests_request_number_key" ON "return_requests"("request_number");

-- CreateIndex
CREATE INDEX "return_requests_order_id_idx" ON "return_requests"("order_id");

-- CreateIndex
CREATE INDEX "return_items_return_request_id_idx" ON "return_items"("return_request_id");

-- CreateIndex
CREATE INDEX "return_items_order_item_id_idx" ON "return_items"("order_item_id");

-- AddForeignKey
ALTER TABLE "return_requests" ADD CONSTRAINT "return_requests_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "return_items" ADD CONSTRAINT "return_items_return_request_id_fkey" FOREIGN KEY ("return_request_id") REFERENCES "return_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "return_items" ADD CONSTRAINT "return_items_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
