import { Product } from "./product";

export interface OrderItem {
  product: Product;

  quantity: number;

  price: number;

  total: number;
}

export interface ShippingAddress {
  fullName: string;

  phone: string;

  email: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  country: string;
}

export interface Order {
  id: string;

  orderNumber: string;

  items: OrderItem[];

  subtotal: number;

  discount: number;

  shippingCharge: number;

  total: number;

  paymentMethod: string;

  paymentStatus:
    | "pending"
    | "paid"
    | "failed";

  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  shippingAddress: ShippingAddress;

  createdAt: string;

  updatedAt: string;
}