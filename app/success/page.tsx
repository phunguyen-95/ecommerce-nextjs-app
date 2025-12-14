"use client";

import { useCartStore } from "@/store/card-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="flex flex-col justify-center w-full">
      <h1 className="text-2xl text-center mb-0.5">Payment successful!</h1>
      <p className="text-center mb-0.5">Thank you for your purchase!!!</p>
      <Link href="/product" className="text-center text-blue-500 underline">
        Continue Shopping
      </Link>
    </div>
  );
}
