import { formatPrice } from "@/lib/helpers";

interface ProductPriceProps {
  price: number;
  salePrice?: number;
}

export default function ProductPrice({
  price,
  salePrice,
}: ProductPriceProps) {
  const hasDiscount =
    salePrice !== undefined &&
    salePrice > 0 &&
    salePrice < price;

  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold text-slate-900">
        {formatPrice(hasDiscount ? salePrice : price)}
      </span>

      {hasDiscount && (
        <span className="text-base text-slate-400 line-through">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
