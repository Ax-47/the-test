"use client";

import { FC, useEffect, useState } from "react";
import CartType from "@/type/cart";
import ProductType from "@/type/product";

interface CartCardProps {
  cart: CartType;
  userId: number;
}

const CartCard: FC<CartCardProps> = ({ cart, userId }) => {
  const [productMap, setProductMap] = useState<Record<number, ProductType>>({});

  const [editItem, setEditItem] = useState<{
    cartId: number;
    productId: number;
    quantity: number;
  } | null>(null);
  const [delItem, setDelItem] = useState<{
    cartId: number;
    productId: number;
  } | null>(null);

  const [delCart, setDelCart] = useState<number | null>(null);
  const [newQty, setNewQty] = useState(1);
  useEffect(() => {
    const fetchProducts = async () => {
      const entries = await Promise.all(
        cart.products.map(async (p) => {
          const res = await fetch(`/api/store/products/${p.productId}`);
          const data = await res.json();
          return [p.productId, data] as const;
        })
      );

      setProductMap(Object.fromEntries(entries));
    };

    fetchProducts();
  }, [cart.products]);
  const handleSave = async () => {
    if (!editItem) return;
    //https://fakestoreapi.com/docs#tag/Carts/operation/updateCart
    //ผมว่าapiเส้นนี้มันแค่ เปลี่ยนproduct ไม่ได้ เปลี่ยน quantity ผมก็เลยสมมุติ ให้มันเปลี่ยน quantity เพราะไม่รู้จะdesignยังไง
    await fetch(`/api/store/carts/${editItem.cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editItem.cartId,
        userId,
        productId: editItem.productId,
        quantity: newQty,
      }),
    });
    setEditItem(null);
  };

  const handleDel = async () => {
    if (!delItem) return;
    //https://fakestoreapi.com/docs#tag/Carts/operation/updateCart
    //เหมือนกันกับอันบน
    await fetch(`/api/store/carts/${delItem.cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: delItem.cartId,
        userId,
        productId: delItem.productId,
        quantity: 0,
      }),
    });
    setDelItem(null);
  };

  const handleDelCart = async () => {
    if (!delCart) return;
    await fetch(`/api/store/carts/${delCart}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setDelCart(null);
  };
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 relative">
      <div className="py-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          🧾 Cart ID: {cart.id}
        </h2>

        <button
          className="text-red-500 ml-2"
          onClick={() => setDelCart(cart.id)}
        >
          Delete
        </button>
      </div>

      <ul className="divide-y divide-gray-100">
        {cart.products.map((product, index) => {
          const productInfo = productMap[product.productId];
          return (
            <li key={index} className="py-2 flex justify-between items-center">
              <span className="text-gray-600">
                {productInfo?.title || `Product #${product.productId}`}
              </span>
              <div>
                <span className="font-medium text-indigo-600">
                  Qty: {product.quantity}
                </span>
                <button
                  className="text-blue-500 ml-4"
                  onClick={() => {
                    setEditItem({
                      cartId: cart.id,
                      productId: product.productId,
                      quantity: product.quantity,
                    });
                    setNewQty(product.quantity);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() =>
                    setDelItem({
                      cartId: cart.id,
                      productId: product.productId,
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-sm text-gray-400 mt-4">
        Date: {new Date(cart.date).toLocaleDateString()}
      </p>

      {editItem && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Quantity</h3>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                className="mt-1 block w-full border rounded px-2 py-1"
                value={newQty}
                onChange={(e) => setNewQty(parseInt(e.target.value))}
                min={1}
              />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditItem(null)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {delItem && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Delete Item</h3>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDelItem(null)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDel}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {delCart && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Delete Cart</h3>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDelCart(null)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelCart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCard;
