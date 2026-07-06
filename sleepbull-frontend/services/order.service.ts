import { poster } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";

export interface CheckoutPayload {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    variantId?: string;
    fabricId?: string;
    quantity: number;
  }>;
}

export interface CheckoutOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  subtotal: string | number;
  grandTotal: string | number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export function placeCodOrder(payload: CheckoutPayload) {
  return poster<CheckoutOrder>(ENDPOINTS.ORDER_CHECKOUT, payload);
}
