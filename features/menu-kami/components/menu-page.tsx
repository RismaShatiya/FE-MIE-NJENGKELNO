
"use client";

import { useMemo, useState } from "react";
import { Utensils } from "lucide-react";

import MenuCard from "./menu-card";
import MenuFilter from "./menu-filter";
import MenuDetailDialog from "./menu-detail-dialog";

import { useMenu } from "../hooks/use-menu";

import {
  KategoriFilter,
  Menu,
} from "../types/menu.type";

export default function MenuPage() {
  const [kategoriAktif, setKategoriAktif] =
    useState<KategoriFilter>("Semua");

  // STATE FORM DETAIL
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] =
    useState<Menu | null>(null);

  const {
    menus,
    loading,
    tambahKeranjang,
  } = useMenu();

  // FILTER KATEGORI
  const filteredMenus = useMemo(() => {
    if (kategoriAktif === "Semua") {
      return menus;
    }

    return menus.filter(
      (menu) => menu.kategori === kategoriAktif
    );
  }, [menus, kategoriAktif]);

  // BUKA DETAIL MENU
  function bukaDetailMenu(menu: Menu) {
    if (menu.status === "Habis") {
      return;
    }

    setSelectedMenu(menu);
    setDialogOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#28201e]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">

        {/* HEADER */}
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-[#a30000]">
            <Utensils size={15} />

            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              Pilihan hidangan kami
            </p>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Menu Kami
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-500">
            Nikmati berbagai pilihan makanan, minuman,
            dan camilan favorit dengan cita rasa khas kami.
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#a30000]" />
        </div>

        {/* FILTER */}
        <div className="mb-7">
          <MenuFilter
            kategoriAktif={kategoriAktif}
            onChange={setKategoriAktif}
          />
        </div>

        {/* JUMLAH MENU */}
        {!loading && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              {kategoriAktif === "Semua"
                ? "Semua Menu"
                : kategoriAktif}
            </p>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm">
              {filteredMenus.length} Menu
            </span>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[3/4] animate-pulse rounded-2xl border border-[#f0e2de] bg-white"
              />
            ))}
          </div>
        )}

        {/* DAFTAR MENU */}
        {!loading && filteredMenus.length > 0 && (
          <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredMenus.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                onTambah={bukaDetailMenu}
              />
            ))}
          </div>
        )}

        {/* MENU KOSONG */}
        {!loading && filteredMenus.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#f0e2de] bg-white px-5 text-center shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#920000]">
              <Utensils size={25} />
            </div>

            <h2 className="text-xl font-bold text-[#28201e]">
              Menu Tidak Ditemukan
            </h2>

            <p className="mt-2 text-sm text-[#82716c]">
              Belum ada menu pada kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* FORM DETAIL MENU */}
      <MenuDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        menu={selectedMenu}
        onTambah={tambahKeranjang}
      />
    </main>
  );
}
