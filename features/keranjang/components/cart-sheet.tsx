"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import CartItem from "./cart-item";
import CartRecommendation from "./cart-recommendation";

import { useCart } from "../hooks/use-cart";

export default function CartSheet() {
  const [open, setOpen] = useState(false);

  const {
    items,
    recommendations,
    subtotal,
    totalItem,
    loading,
    tambahJumlah,
    kurangJumlah,
    hapusItem,
  } = useCart();

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* TOMBOL KERANJANG */}
      <Button
        type="button"
        variant="ghost"
        aria-label="Buka keranjang belanja"
        onClick={() => setOpen(true)}
        className="relative ml-4 flex h-10 items-center gap-2 px-2 text-white hover:bg-white/10 hover:text-white"
      >
        <ShoppingCart size={24} strokeWidth={1.7} />

        <span className="hidden text-sm font-semibold sm:inline">
          Keranjang Belanja
        </span>

        {totalItem > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold text-[#920000]">
            {totalItem}
          </span>
        )}
      </Button>

      <SheetContent
        side="right"
        showCloseButton
        className="flex w-full flex-col gap-0 p-0 sm:max-w-[420px]"
      >
        {/* HEADER */}
        <SheetHeader className="bg-[#920000] px-5 py-5 text-white">
          <SheetTitle className="flex items-center gap-3 text-lg font-bold text-white">
            <ShoppingCart size={21} />
            Keranjang Belanja
          </SheetTitle>
        </SheetHeader>

        {/* DAFTAR KERANJANG */}
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
          {loading ? (
            <p className="py-10 text-center text-sm text-gray-400">
              Memuat keranjang...
            </p>
          ) : items.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
              <ShoppingCart
                size={42}
                className="mb-3 text-gray-300"
              />

              <h3 className="font-bold text-gray-800">
                Keranjang Masih Kosong
              </h3>

              <p className="mt-2 text-xs text-gray-400">
                Silakan tambahkan menu favorit Anda.
              </p>
            </div>
          ) : (
            <>
              {/* ITEM KERANJANG */}
              <div className="rounded-xl border border-gray-200 px-3">
                {items.map((item) => {
                  const catatan = item.catatan ?? "";

                  return (
                    <CartItem
                      key={`${item.id}-${item.level}-${catatan}`}
                      item={item}
                      onTambah={() =>
                        tambahJumlah(item.id, item.level, catatan)
                      }
                      onKurang={() =>
                        kurangJumlah(item.id, item.level, catatan)
                      }
                      onHapus={() =>
                        hapusItem(item.id, item.level, catatan)
                      }
                    />
                  );
                })}
              </div>

              {/* REKOMENDASI */}
              <CartRecommendation
                recommendations={recommendations}
                onTambah={(item) => {
                  // Akan dihubungkan dengan fungsi
                  // tambahRekomendasi dari useCart.
                }}
              />
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="space-y-4 border-t border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-300 px-3 py-4">
            <span className="text-sm font-semibold text-gray-700">
              Subtotal
            </span>

            <span className="text-sm font-extrabold text-gray-900">
              Rp {formatRupiah(subtotal)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* LANJUT BELANJA */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-[#920000] text-xs font-semibold text-[#920000] hover:bg-red-50"
            >
              ← Lanjut Belanja
            </Button>

            {/* CHECKOUT */}
            {items.length > 0 ? (
              <Link
                href="/pelanggan/checkout"
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#920000] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#760000]"
                >
                Checkout
                <ArrowRight size={15} className="ml-2" />
                </Link>
            ) : (
              <Button
                type="button"
                disabled
                className="bg-gray-300 text-xs text-gray-500"
              >
                Checkout
                <ArrowRight size={15} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}