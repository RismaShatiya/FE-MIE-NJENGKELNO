
"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Menu } from "../types/menu.type";

interface MenuCardProps {
  menu: Menu;
  onTambah: (menu: Menu) => void;
}

export default function MenuCard({
  menu,
  onTambah,
}: MenuCardProps) {
  const habis = menu.status === "Habis";
  const levelHarga = menu.levelHarga ?? [];

  const hargaMulai =
    levelHarga.length > 0
      ? Math.min(...levelHarga.map((item) => Number(item.harga)))
      : null;

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  return (
    <Card
      onClick={() => onTambah(menu)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onTambah(menu);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Lihat detail ${menu.nama}`}
      className={`
        group flex h-full min-w-0 cursor-pointer flex-col
        overflow-hidden rounded-2xl border p-1.5 shadow-sm
        transition-all duration-200
        ${
          habis
            ? "border-gray-200 bg-gray-100"
            : "border-gray-200 bg-white hover:-translate-y-1 hover:border-[#920000]/40 hover:shadow-lg"
        }
      `}
    >
      {/* FOTO */}
      <div
        className={`
          relative aspect-[1.25/1] w-full shrink-0
          overflow-hidden rounded-xl bg-gray-100
          ${habis ? "grayscale" : ""}
        `}
      >
        <Image
          src={menu.foto || "/images/no-image.png"}
          alt={menu.nama}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span
          className={`
            absolute left-2 top-2 rounded-full
            px-2.5 py-1 text-[10px] font-bold text-white
            ${
              habis
                ? "bg-gray-500"
                : menu.kategori === "Makanan"
                  ? "bg-red-600"
                  : menu.kategori === "Minuman"
                    ? "bg-blue-500"
                    : "bg-orange-500"
            }
          `}
        >
          {menu.kategori}
        </span>

        {habis && (
          <span className="absolute bottom-2 right-2 rounded-full bg-gray-800/80 px-2.5 py-1 text-[10px] font-bold text-white">
            HABIS
          </span>
        )}
      </div>

      {/* INFORMASI */}
      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2.5">
        <h3
          className={`line-clamp-2 min-h-[36px] text-sm font-bold leading-snug ${
            habis ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {menu.nama}
        </h3>

        <div className="mt-1 min-h-[35px]">
          <p
            className={`text-sm font-extrabold ${
              habis ? "text-gray-400" : "text-[#920000]"
            }`}
          >
            {hargaMulai !== null
              ? `Rp ${formatRupiah(hargaMulai)}`
              : "Harga belum tersedia"}
          </p>

          {levelHarga.length > 1 && (
            <span className="text-[10px] text-gray-400">
              Harga mulai dari
            </span>
          )}
        </div>

        {/* TOMBOL DETAIL */}
        <div className="mt-auto pt-2">
          <Button
            type="button"
            disabled={habis}
            onClick={(event) => {
              event.stopPropagation();
              onTambah(menu);
            }}
            className={`
              h-9 w-full rounded-lg text-xs font-semibold
              ${
                habis
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-[#920000] text-white hover:bg-[#760000]"
              }
            `}
          >
            <ShoppingCart size={14} className="mr-1" />
            {habis ? "Habis" : "Tambah"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

