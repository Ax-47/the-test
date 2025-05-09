"use client";

import CartCard from "@/components/CartCard";
import Navbar from "@/components/Nav";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import CartType from "@/type/cart";
export default function Cart() {
  const { payload: token, loading: authLoading } = useAuth();
  const {
    data: carts,
    loading,
    error,
  } = useFetch<CartType[]>("/api/store/carts");
  if (authLoading || !token) {
    return (
      <div className="text-center py-16 text-gray-500">
        Loading authentication...
      </div>
    );
  }

  const userCarts = carts?.filter((cart) => cart.userId === token.sub) || [];

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🛒 Your Cart
        </h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error loading cart data.</p>
        )}
        {userCarts.length === 0 && !loading && (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        <div className="space-y-6">
          {userCarts.map((cart) => (
            <CartCard key={cart.id} cart={cart} userId={token.sub} />
          ))}
        </div>
      </div>
    </>
  );
}
