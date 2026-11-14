
import { api } from "@/lib/axios";

import type {
  PaymentActionPayload,
  PaymentActionResponse,
} from "../types/checkout-qris.type";

// KONFIRMASI PEMBAYARAN
export const confirmPayment = async (
  payload: PaymentActionPayload
): Promise<PaymentActionResponse> => {
  const response = await api.post<PaymentActionResponse>(
    "/pelanggan/pembayaran/konfirmasi",
    payload
  );

  return response.data;
};

// BATALKAN PESANAN
export const cancelPayment = async (
  payload: PaymentActionPayload
): Promise<PaymentActionResponse> => {
  const response = await api.post<PaymentActionResponse>(
    "/pelanggan/pembayaran/batal",
    payload
  );

  return response.data;
};
