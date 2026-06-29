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
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
  
        {Boolean(discount && discount > 0) && (
          <span className="rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white">
            {discount}% OFF
          </span>
        )}
  
        {isFeatured && (
          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white">
            Featured
          </span>
        )}
  
        {isBestSeller && (
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-text-white">
            Best Seller
          </span>
        )}
  
      </div>
    );
  }
