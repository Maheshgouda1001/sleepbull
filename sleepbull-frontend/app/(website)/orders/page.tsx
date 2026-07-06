import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";
import {
  Package,
  ChevronRight,
  CircleCheck,
  Truck,
  Clock3,
} from "lucide-react";

export const metadata = generateSEO({
  title: "My Orders",
  url: "/orders",
});

const orders = [
  {
    id: "SB20250001",
    date: "20 July 2025",
    status: "Delivered",
    color: "text-green-600",
    icon: CircleCheck,
    total: "₹29,999",
    image: "/images/products/latex-mattress.webp",
    product: "SleepBull Natural Latex Mattress",
    variant: "Queen | Grey Fabric",
  },
  {
    id: "SB20250002",
    date: "15 July 2025",
    status: "Shipped",
    color: "text-blue-600",
    icon: Truck,
    total: "₹1,999",
    image: "/images/products/memory-pillow.webp",
    product: "SleepBull Memory Foam Pillow",
    variant: "Standard",
  },
  {
    id: "SB20250003",
    date: "10 July 2025",
    status: "Processing",
    color: "text-amber-600",
    icon: Clock3,
    total: "₹17,999",
    image: "/images/products/hr-foam.webp",
    product: "SleepBull HR Foam Mattress",
    variant: "King | Brown Fabric",
  },
];

export default function OrdersPage() {
  return (
    <Container className="py-16">
      <div className="mb-10 flex items-center gap-3">
        <Package className="text-primary" size={30} />
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            My Orders
          </h1>

          <p className="mt-2 text-slate-500">
            Track your purchases and view your order history.
          </p>
        </div>
      </div>
      {orders.length > 0 ? (
      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = order.icon;

          return (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-5">
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={order.image}
                      alt={order.product}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {order.product}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {order.variant}
                    </p>

                    <p className="mt-3 font-medium">
                      Order ID : {order.id}
                    </p>

                    <p className="text-sm text-slate-500">
                      Ordered on {order.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      Order Total
                    </p>

                    <p className="text-2xl font-bold text-primary">
                      {order.total}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 font-semibold ${order.color}`}
                  >
                    <StatusIcon size={18} />

                    {order.status}
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-white transition hover:opacity-90"
                  >
                    View Details
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>) : (<div className="flex flex-col items-center py-24">
    <Package
        size={80}
        className="text-slate-300"
    />

    <h2 className="mt-6 text-3xl font-bold">
        No Orders Yet
    </h2>

    <p className="mt-3 max-w-md text-center text-slate-500">
        Looks like you haven&apos;t placed any orders yet.
        Explore our premium mattresses and pillows.
    </p>

    <Link
        href="/products"
        className="mt-8 rounded-lg bg-primary px-8 py-3 text-white"
    >
        Shop Now
    </Link>
</div>)}
    </Container>
  );
}