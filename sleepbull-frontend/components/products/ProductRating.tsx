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
          className="fill-yellow-400 text-yellow-400"
          size={16}
        />

      </div>

      <span className="font-medium">

        {rating.toFixed(1)}

      </span>

      <span className="text-slate-500">

        ({reviewCount})

      </span>

    </div>
  );
}