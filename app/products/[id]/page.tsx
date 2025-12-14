import { ProductDetail } from "@/components/ui/product-detail";
import { stripe } from "@/lib/stripe";
import { use } from "react";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });
  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}
