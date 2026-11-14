"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "../types/cart.type";

interface CartItemProps {
  item: CartItemType;
  onTambah: () => void;
  onKurang: () => void;
  onHapus: () => void;
}

export default function CartItem({
  item,
  onTambah,
  onKurang,
  onHapus,
}: CartItemProps) {
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  return (
    <div className="flex gap-3 border-b border-gray-100 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={item.foto || "/images/no-image.png"}
          alt={item.nama}
          fill
          unoptimized
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-sm font-bold text-gray-900">
              {item.nama}
            </h3>

            <p className="text-xs text-gray-500">
              Level {item.level}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onHapus}
            aria-label={`Hapus ${item.nama}`}
            className="h-7 w-7 shrink-0 text-gray-400 hover:text-red-600"
          >
            <Trash2 size={15} />
          </Button>
        </div>

        <p className="mt-1 text-xs font-bold text-[#920000]">
          Rp {formatRupiah(item.harga)}
        </p>

        {item.catatan && (
          <p className="mt-1 line-clamp-1 text-[11px] text-gray-400">
            Catatan: {item.catatan}
          </p>
        )}

        <div className="mt-2 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={item.jumlah <= 1}
            onClick={onKurang}
            className="h-7 w-7 rounded-full"
            aria-label="Kurangi jumlah"
          >
            <Minus size={12} />
          </Button>

          <span className="min-w-4 text-center text-xs font-semibold">
            {item.jumlah}
          </span>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={item.jumlah >= 99}
            onClick={onTambah}
            className="h-7 w-7 rounded-full"
            aria-label="Tambah jumlah"
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}