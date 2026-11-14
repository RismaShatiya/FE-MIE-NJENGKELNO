
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  getCart,
  clearCart,
} from "@/features/keranjang/services/cart.service";

import { createCheckout } from "../services/checkout.service";

import {
  checkoutSchema,
} from "../types/checkout.type";

import type {
  CartItem,
  CheckoutFormData,
  CheckoutResponse,
} from "../types/checkout.type";

export function useCheckout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [checkoutResult, setCheckoutResult] =
    useState<CheckoutResponse | null>(null);

  // CALLBACK SUKSES
  const onSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  // CALLBACK ERROR
  const onError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  // AMBIL DATA KERANJANG
  const fetchCart = useCallback(() => {
    try {
      const data = getCart();
      setItems(data);
    } catch {
      onError("Gagal mengambil data keranjang.");
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchCart();

    const handleUpdate = () => fetchCart();

    window.addEventListener("keranjang-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("keranjang-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchCart]);

  // SUBTOTAL
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.harga * item.jumlah,
      0
    );
  }, [items]);

  // TOTAL ITEM
  const totalItem = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.jumlah,
      0
    );
  }, [items]);

  // FORMAT RUPIAH
  const formatRupiah = useCallback((value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  // PROSES CHECKOUT
  const submitCheckout = useCallback(
    async (formData: CheckoutFormData) => {
      if (items.length === 0) {
        onError("Keranjang belanja masih kosong.");
        return;
      }

      const validation = checkoutSchema.safeParse(formData);

      if (!validation.success) {
        onError(
          validation.error.issues[0]?.message ??
            "Data tidak valid."
        );
        return;
      }

      try {
        setSubmitting(true);

        const payload = {
          nama: validation.data.nama.trim(),
          noHp: validation.data.noHp,
          metodePembayaran: "QRIS" as const,

          items: items.map((item) => ({
            menuId: item.id,
            level: item.level,
            jumlah: item.jumlah,
            catatan: item.catatan ?? "",
          })),
        };

        const result = await createCheckout(payload);

        setCheckoutResult(result);

        // KOSONGKAN KERANJANG SETELAH PESANAN BERHASIL DIBUAT
        clearCart();
        setItems([]);

        onSuccess("Pesanan berhasil dibuat.");

      } catch (error) {
        const axiosError = error as AxiosError<{
          message?: string;
        }>;

        onError(
          axiosError.response?.data?.message ??
            "Gagal membuat pesanan. Silakan coba kembali."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [items, onSuccess, onError]
  );

  return {
    items,
    loading,
    submitting,
    checkoutResult,
    subtotal,
    totalItem,
    formatRupiah,
    submitCheckout,
  };
}
