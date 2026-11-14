
"use client";

import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  confirmPayment,
  cancelPayment,
} from "../services/checkout-payment.service";

export function useCheckoutPayment(
  nomorPesanan: string | null
) {
  const [processing, setProcessing] = useState(false);

  // CALLBACK SUKSES
  const onSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  // CALLBACK ERROR
  const onError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  // KONFIRMASI PEMBAYARAN
  const handleConfirmPayment = useCallback(async (): Promise<boolean> => {
    if (!nomorPesanan) {
      onError("Nomor pesanan tidak ditemukan.");
      return false;
    }

    try {
      setProcessing(true);

      const response = await confirmPayment({
        nomorPesanan,
      });

      onSuccess(
        response.message || "Konfirmasi pembayaran berhasil."
      );

      return true;

    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
      }>;

      onError(
        axiosError.response?.data?.message ||
          "Gagal mengonfirmasi pembayaran."
      );

      return false;

    } finally {
      setProcessing(false);
    }
  }, [nomorPesanan, onSuccess, onError]);

  // BATALKAN PESANAN
  const handleCancelPayment = useCallback(async (): Promise<boolean> => {
    if (!nomorPesanan) {
      onError("Nomor pesanan tidak ditemukan.");
      return false;
    }

    try {
      setProcessing(true);

      const response = await cancelPayment({
        nomorPesanan,
      });

      onSuccess(
        response.message || "Pesanan berhasil dibatalkan."
      );

      return true;

    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
      }>;

      onError(
        axiosError.response?.data?.message ||
          "Gagal membatalkan pesanan."
      );

      return false;

    } finally {
      setProcessing(false);
    }
  }, [nomorPesanan, onSuccess, onError]);

  return {
    processing,
    handleConfirmPayment,
    handleCancelPayment,
  };
}
