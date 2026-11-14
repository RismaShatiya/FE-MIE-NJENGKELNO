"use client";

import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { getCekPesanan } from "../services/cek-pesanan.service";
import type { CekPesanan } from "../types/cek-pesanan.type";

export function useCekPesanan() {
  const [nomorPesanan, setNomorPesanan] = useState("");
  const [pesanan, setPesanan] = useState<CekPesanan | null>(null);
  const [loading, setLoading] = useState(false);

  // CALLBACK SUKSES
  const onSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  // CALLBACK ERROR
  const onError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  // CEK PESANAN
  const handleCekPesanan = useCallback(async () => {
    const nomor = nomorPesanan.trim();

    if (!nomor) {
      onError("Silakan masukkan nomor pesanan.");
      return;
    }

    try {
      setLoading(true);
      setPesanan(null);

      const response = await getCekPesanan(nomor);

      setPesanan(response);

      onSuccess("Data pesanan berhasil ditemukan.");
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
      }>;

      setPesanan(null);

      onError(
        axiosError.response?.data?.message ||
          (error instanceof Error && error.name === "ZodError"
            ? "Format data pesanan dari server tidak valid."
            : "Nomor pesanan tidak ditemukan atau terjadi kesalahan.")
      );
    } finally {
      setLoading(false);
    }
  }, [nomorPesanan, onSuccess, onError]);

  return {
    nomorPesanan,
    setNomorPesanan,
    pesanan,
    loading,
    handleCekPesanan,
  };
}