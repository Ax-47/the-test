"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { payload: token } = useAuth();

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
      <Link href="/" className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-800 transition duration-200">
        🛍️ Mikhail Store
      </Link>

      <div className="flex items-center gap-6 text-base font-medium">
        {!token ? (
          <Link
            href="/signin"
            className="text-gray-600 hover:text-indigo-600 transition duration-200"
          >
            👤 Sign In
          </Link>
        ) : (
          <>
            <Link
              href="/carts"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              🛒 Cart
            </Link>
            <p className="text-gray-700 font-semibold">
              👋 {token.user}
            </p>
            <button className="text-gray-600 hover:text-red-500 transition duration-200">
              🚪 Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
