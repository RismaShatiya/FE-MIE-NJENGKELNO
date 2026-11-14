
"use client";

import { Button } from "@/components/ui/button";
import { KategoriFilter } from "../types/menu.type";

interface MenuFilterProps {
  kategoriAktif: KategoriFilter;
  onChange: (kategori: KategoriFilter) => void;
}

const kategoriList: KategoriFilter[] = [
  "Semua",
  "Makanan",
  "Minuman",
  "Snack",
];

export default function MenuFilter({
  kategoriAktif,
  onChange,
}: MenuFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {kategoriList.map((kategori) => {
        const aktif = kategoriAktif === kategori;

        return (
          <Button
            key={kategori}
            onClick={() => onChange(kategori)}
            variant="outline"
            className={`
              h-9 min-w-[88px] rounded-full px-5
              text-xs font-semibold transition-all
              ${
                aktif
                  ? "border-[#920000] bg-[#920000] text-white shadow-sm hover:bg-[#780000] hover:text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#920000] hover:bg-red-50 hover:text-[#920000]"
              }
            `}
          >
            {kategori}
          </Button>
        );
      })}
    </div>
  );
}
