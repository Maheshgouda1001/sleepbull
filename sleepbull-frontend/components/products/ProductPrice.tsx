import { formatPrice } from "@/lib/helpers";

interface ProductPriceProps {
  price: number;
  salePrice?: number;
  compact?: boolean;
}

export default function ProductPrice({
  price,
  salePrice,
  compact = false,
}: ProductPriceProps) {
  const hasDiscount =
    salePrice !== undefined &&
    salePrice > 0 &&
    salePrice < price;

  return (
    <div className="flex items-baseline gap-2">
      <span
        className={
          compact
            ? "text-base font-bold text-text-primary"
            : "text-lg font-bold text-text-primary"
        }
      >
        {formatPrice(hasDiscount ? salePrice : price)}
      </span>

      {hasDiscount && (
        <span className="text-xs text-text-light line-through">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
