"use client";

import ProductType from "@/type/product";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition duration-300">
      <Link href={`/products/${product.id}`}>

        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-700 truncate">
          {product.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2 truncate">
          {product.description}
        </p>
        <div className="mt-auto text-right text-indigo-600 font-bold text-lg">
          ${product.price.toFixed(2)}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
