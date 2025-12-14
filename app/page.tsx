import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Shrimp Store
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-between rounded-full px-6 py-3 bg-black text-violet-400"
            >
              <Link
                href="products"
                className="inline-flex items-center justify-center rounded-full px-6 px-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="banner"
            width={450}
            height={450}
            src={products.data[2].images[0]}
          />
        </div>
      </section>
      <section>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
