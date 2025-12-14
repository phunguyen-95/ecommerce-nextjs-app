"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { ChangeEvent, useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch =
      product?.description?.toLowerCase().includes(term) || false;
    return nameMatch || descriptionMatch;
  });

  const onSearch = (e?: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.value) return;
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none"
          type="text"
          placeholder="Search products..."
          onChange={onSearch}
        />
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduct.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
