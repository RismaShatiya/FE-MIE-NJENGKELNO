
"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { getMenus } from "../services/menu.service";

import {
  CartItem,
  Menu,
} from "../types/menu.type";

export function useMenu() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenus = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMenus();

      setMenus(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data menu";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  // TAMBAH KE KERANJANG
  const tambahKeranjang = useCallback(
    (
      menu: Menu,
      level: number,
      jumlah: number,
      catatan: string
    ) => {
      if (menu.status !== "Tersedia") {
        toast.error("Menu sedang habis.");
        return;
      }

      const hargaTerpilih = menu.levelHarga?.find(
        (item) => item.level === level
      );

      if (!hargaTerpilih) {
        toast.error("Harga menu tidak ditemukan.");
        return;
      }

      try {
        const storedCart = localStorage.getItem("keranjang");

        const cart: CartItem[] = storedCart
          ? JSON.parse(storedCart)
          : [];

        if (!Array.isArray(cart)) {
          throw new Error("Format keranjang tidak valid.");
        }

        // Item yang sama harus memiliki ID, level, dan catatan sama.
        const existingItem = cart.find(
          (item) =>
            item.id === menu.id &&
            item.level === level &&
            (item.catatan ?? "") === catatan
        );

        if (existingItem) {
          existingItem.jumlah += jumlah;
        } else {
          cart.push({
            id: menu.id,
            nama: menu.nama,
            harga: Number(hargaTerpilih.harga),
            foto: menu.foto ?? "/images/no-image.png",
            level,
            jumlah,
            catatan,
          });
        }

        localStorage.setItem(
          "keranjang",
          JSON.stringify(cart)
        );

        toast.success(
          `${menu.nama} berhasil ditambahkan ke keranjang.`
        );

        // Beritahu komponen lain jika mendengarkan perubahan keranjang.
        window.dispatchEvent(
          new Event("keranjang-updated")
        );
      } catch {
        toast.error("Gagal menambahkan menu ke keranjang.");
      }
    },
    []
  );

  return {
    menus,
    loading,
    fetchMenus,
    tambahKeranjang,
  };
}
