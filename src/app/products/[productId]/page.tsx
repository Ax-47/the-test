"use client";
import ProductType from "@/type/product";
import Image from "next/image";
import Navbar from "@/components/Nav";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { use } from "react";
import { Toaster, toast } from "react-hot-toast";
type PageProps = {
  params: Promise<{ productId: string }>;
};
export default function ProductPage({ params }: PageProps) {
  const { productId } = use(params);
  const {
    data: product,
    loading,
    error,
  } = useFetch<ProductType>(`https://fakestoreapi.com/products/${productId}`);
  const { payload, loading: authLoading } = useAuth();
  const addToCart = async (product: ProductType) => {
    if (!payload?.sub) {
      toast.error("You must be logged in!");
      return;
    }

    const res = await fetch(`/api/store/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 69, // id อะไรวะ
        userId: payload.sub,
        products: [product],
      }),
    });
    if (res.ok) {
      toast.success("Added to cart! 🛒");
    } else {
      toast.error("Failed to add to cart 😢");
    }
  };
  if (loading || authLoading) {
    return <p className="p-10 text-center text-gray-500">Loading...</p>;
  }

  if (error || !product) {
    return (
      <p className="p-10 text-center text-red-500">Failed to load product.</p>
    );
  }

  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "80px",
          },
        }}
      />
      <div className="mx-auto py-30 px-30">
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-xl p-6">
          <div className="flex-1 flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain max-h-96"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mb-4 capitalize">
                {product.category}
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="text-right text-indigo-600 font-bold text-2xl">
                ${product.price.toFixed(2)}
              </div>
              {payload && (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-indigo-300 stroke-2 stroke-indigo-400 text-indigo-950 hover:bg-indigo-500 hover:text-white px-3 py-2 text-xl rounded-xl"
                >
                  add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
