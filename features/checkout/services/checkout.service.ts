
import { api } from "@/lib/axios";

import type {
  CheckoutPayload,
  CheckoutResponse,
} from "../types/checkout.type";

interface CheckoutApiResponse {
  message: string;
  data: CheckoutResponse;
}

export const createCheckout = async (
  payload: CheckoutPayload
): Promise<CheckoutResponse> => {
  const response = await api.post<CheckoutApiResponse>(
    "/pelanggan/checkout",
    payload
  );

  return response.data.data;
};
