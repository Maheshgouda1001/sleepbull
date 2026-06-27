import Image from "next/image";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductGallery({
  product,
}: Props) {
  return (
    <div>

      <div className="overflow-hidden rounded-3xl bg-slate-100">

        <Image
          src={
            product.images[0]?.image ??
            "/images/placeholder.svg"
          }
          alt={product.name}
          width={800}
          height={800}
          priority
          className="w-full"
        />

      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">

        {product.images.map((image) => (

          <button
            key={image.id}
            className="overflow-hidden rounded-xl border"
          >

            <Image
              src={image.image}
              alt={product.name}
              width={150}
              height={150}
            />

          </button>

        ))}

      </div>

    </div>
  );
}