"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  CartItem,
  CartRecommendation,
} from "../types/cart.type";

import {
  getCart,
  saveCart,
  clearCart,
} from "../services/cart.service";

import {
  getCartRecommendations,
} from "../services/recommendation.service";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [recommendations, setRecommendations] = useState<
    CartRecommendation[]
  >([]);
  const [loading, setLoading] = useState(true);

  // CALLBACK SUKSES
  const onSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  // CALLBACK ERROR
  const onError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  // AMBIL KERANJANG
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

    window.addEventListener(
      "keranjang-updated",
      handleUpdate
    );

    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(
        "keranjang-updated",
        handleUpdate
      );

      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchCart]);

  // SIMPAN PERUBAHAN KERANJANG
  const updateCart = useCallback(
    (newItems: CartItem[]) => {
      try {
        saveCart(newItems);
        setItems(newItems);
      } catch {
        onError("Gagal memperbarui keranjang.");
      }
    },
    [onError]
  );

  // TAMBAH JUMLAH
  const tambahJumlah = useCallback(
    (id: number, level: number, catatan = "") => {
      const updated = items.map((item) =>
        item.id === id &&
        item.level === level &&
        (item.catatan ?? "") === catatan
          ? { ...item, jumlah: Math.min(item.jumlah + 1, 99) }
          : item
      );

      updateCart(updated);
    },
    [items, updateCart]
  );

  // KURANGI JUMLAH
  const kurangJumlah = useCallback(
    (id: number, level: number, catatan = "") => {
      const updated = items
        .map((item) =>
          item.id === id &&
          item.level === level &&
          (item.catatan ?? "") === catatan
            ? { ...item, jumlah: item.jumlah - 1 }
            : item
        )
        .filter((item) => item.jumlah > 0);

      updateCart(updated);
    },
    [items, updateCart]
  );

  // HAPUS MENU
  const hapusItem = useCallback(
    (id: number, level: number, catatan = "") => {
      const updated = items.filter(
        (item) =>
          !(
            item.id === id &&
            item.level === level &&
            (item.catatan ?? "") === catatan
          )
      );

      updateCart(updated);
      onSuccess("Menu berhasil dihapus dari keranjang.");
    },
    [items, updateCart, onSuccess]
  );

  // KOSONGKAN KERANJANG
  const kosongkanKeranjang = useCallback(() => {
    try {
      clearCart();
      setItems([]);
      onSuccess("Keranjang berhasil dikosongkan.");
    } catch {
      onError("Gagal mengosongkan keranjang.");
    }
  }, [onSuccess, onError]);

  // SUBTOTAL
  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.harga * item.jumlah,
        0
      ),
    [items]
  );

  // TOTAL ITEM
  const totalItem = useMemo(
    () => items.reduce((total, item) => total + item.jumlah, 0),
    [items]
  );

  // REKOMENDASI
  const fetchRecommendations = useCallback(async () => {
    try {
      const menuIds = [...new Set(items.map((item) => item.id))];

      const data = await getCartRecommendations(menuIds);

      setRecommendations(data);
    } catch {
      setRecommendations([]);
    }
  }, [items]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    items,
    recommendations,
    subtotal,
    totalItem,
    loading,
    tambahJumlah,
    kurangJumlah,
    hapusItem,
    kosongkanKeranjang,
  };
}