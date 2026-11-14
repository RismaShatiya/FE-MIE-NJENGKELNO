"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { CartRecommendation } from "../types/cart.type";

interface CartRecommendationProps {
  recommendations: CartRecommendation[];
  onTambah: (item: CartRecommendation) => void;
}

export default function CartRecommendation({
  recommendations,
  onTambah,
}: CartRecommendationProps) {
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={17} className="text-[#920000]" />

        <h3 className="text-sm font-bold text-[#920000]">
          Rekomendasi Untukmu
        </h3>
      </div>

      {recommendations.length === 0 ? (
        <p className="py-3 text-center text-xs leading-relaxed text-gray-400">
          Rekomendasi menu akan tersedia setelah model Apriori
          diintegrasikan.
        </p>
      ) : (
        <div className="space-y-3">
          {recommendations.map((item) => (
            <div
              key={item.id}
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
                <p className="text-xs font-semibold text-gray-900">
                  {item.nama}
                </p>

                <p className="text-xs font-bold text-[#920000]">
                  Rp {formatRupiah(item.harga)}
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {item.alasan}
                </p>

                <Button
                  type="button"
                  onClick={() => onTambah(item)}
                  className="mt-1 h-6 rounded-md bg-[#920000] px-3 text-[10px] hover:bg-[#760000]"
                >
                  Tambah
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}