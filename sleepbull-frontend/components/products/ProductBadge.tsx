interface ProductBadgeProps {
    isFeatured?: boolean;
    isBestSeller?: boolean;
    discount?: number;
  }
  
  export default function ProductBadge({
    isFeatured,
    isBestSeller,
    discount,
  }: ProductBadgeProps) {
    return (
      <div className="absolute left-4 top-4 flex flex-col gap-2">
  
        {discount && discount > 0 && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}
  
        {isFeatured && (
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
  
        {isBestSeller && (
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
            Best Seller
          </span>
        )}
  
      </div>
    );
  }