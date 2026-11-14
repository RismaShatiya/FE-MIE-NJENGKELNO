"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";

import type { CartItem } from "@/features/keranjang/types/cart.type";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  formatRupiah: (value: number) => string;
}

export default function CheckoutOrderSummary({
  items,
  subtotal,
  formatRupiah,
}: CheckoutOrderSummaryProps) {
  return (
    <Card className="rounded-xl border-gray-200 p-4 shadow-none">
      <h2 className="mb-4 text-base font-bold text-gray-900">
        Detail Pesanan
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${item.level}-${item.catatan ?? ""}-${index}`}
            className="flex items-center gap-3"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={item.foto || "/images/no-image.png"}
                alt={item.nama}
                fill
                unoptimized
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-900">
                {item.nama}
              </p>

              <p className="text-[11px] text-gray-500">
                Level {item.level} × {item.jumlah}
              </p>

              {item.catatan && (
                <p className="text-[10px] text-gray-400">
                  Catatan: {item.catatan}
                </p>
              )}
            </div>

            <p className="shrink-0 text-xs font-medium text-gray-800">
              Rp {formatRupiah(item.harga * item.jumlah)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Subtotal</span>
          <span>Rp {formatRupiah(subtotal)}</span>
        </div>

        <div className="mt-2 flex justify-between text-sm font-extrabold text-gray-900">
          <span>Total</span>
          <span>Rp {formatRupiah(subtotal)}</span>
        </div>
      </div>
    </Card>
  );
}