"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/card-store";
import { redirect } from "next/navigation";

export const checkoutActions = async (formData: FormData): Promise<void> => {
  const itemJson = formData.get("items") as string;
  const items = JSON.parse(itemJson);
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "cad",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url);
};
