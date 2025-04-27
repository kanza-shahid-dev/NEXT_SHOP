"use client";
import Loader from "@/components/Loader";
import { Product } from "@/types/product";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.product.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-20 mb-5">Cart</h1>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.imageData[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div>
                      <h2 className="font-semibold">{item.product.name}</h2>
                      <p className="text-gray-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity === 1}
                          className="px-2 py-1 bg-gray-300 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 text-right text-xl font-bold">
                Total: ${totalAmount?.toFixed(2)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
