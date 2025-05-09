"use client";
import ProductType from "../type/product";
import useFetch from "@/hooks/useFetch";
import Navbar from "@/components/Nav";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useMemo, useState } from "react";

export default function Home() {
  const {
    data: products,
    error,
    loading,
  } = useFetch<ProductType[]>("/api/store/products");//fetch ออกมาหมด เพราะdocs ไม่ได้บอกว่า จะทำoffsetยังไง

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return products?.slice(start, start + pageSize) || [];
  }, [products, currentPage]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-6 sm:px-10 md:px-16 lg:px-24 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          🛒 Product List
        </h1>

        {loading && <Loading />}
        {error && <Error message={error} />}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {paginatedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil((products?.length || 0) / pageSize)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
