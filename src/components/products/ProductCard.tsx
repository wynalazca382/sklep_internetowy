import Image from "next/image";
import { useProductsStore } from "../../stores/useProductsStore";
import { useCartStore } from "../../stores/useCartStore";
import { Product } from "@/types.d";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl flex flex-col p-4 relative">
      <div className='relative'>
        <Image
          src={product.images[0]}
          alt={product.title}
          width={100}
          height={100}
          className='object-contain w-full h-40'
        />
        <span className='absolute top-2 right-2 bg-white p-1 rounded-md'>
          ${product.price.toFixed(2)}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between mt-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600 flex-1">{product.description}</p>
        <div className="mt-4 flex items-center">
          <button type="button" className="bg-gray-500 text-white font-semibold py-1 px-2 rounded hover:bg-gray-400">
            <Link href={`/${product.id}`}>
              View Details
            </Link>
          </button>
          <button
            type="button"
            className="ml-2 bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-400"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
