"use client";
import { useCartStore } from "@/store/card-store";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobile, setIsMobile] = useState(false);

  function handleMobile() {
    if (!window.innerWidth) return;

    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600">
          My Ecommerce
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute bg-red-600 h-5 w-5 text-white flex items-center justify-center rounded-full -top-2 -right-2 ">
                {cartCount}
              </span>
            )}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobile((pre) => !pre)}
            >
              {isMobile ? <XMarkIcon /> : <Bars3Icon />}
            </Button>
          </Link>
        </div>
      </div>
      {isMobile && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkouts" className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
