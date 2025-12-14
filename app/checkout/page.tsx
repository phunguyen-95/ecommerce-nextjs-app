"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/card-store";
import { checkoutActions } from "./checkout-actions";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  if (total === 0 || !items.length) return <div>Your Cart is Empty</div>;

  return (
    <div className="w-1/3 align-center mx-auto">
      <h1 className="font-bold mb-2">Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-weight">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-xs font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => removeItem(item.id)} variant="outline">
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button onClick={() => addItem({ ...item, quantity: 1 })}>
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold border-t">
            Total: {(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form className="max-w-md mx-auto" action={checkoutActions}>
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button variant="default" type="submit" className="w-full mt-4">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
