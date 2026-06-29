import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

export default function ProductRating({
  rating,
  reviewCount,
}: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">

      <div className="flex items-center">

        <Star
          className="fill-secondary text-secondary"
          size={14}
        />

      </div>

      <span className="text-sm font-semibold">

        {rating.toFixed(1)}

      </span>

      <span className="text-xs text-text-light">

        ({reviewCount})

      </span>

    </div>
  );
}
