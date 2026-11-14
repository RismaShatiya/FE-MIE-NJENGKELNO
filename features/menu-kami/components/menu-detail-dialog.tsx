"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
    ShoppingCart,
    Flame,
    Plus,
    Minus,
    X,
} from "lucide-react";

import { Menu } from "../types/menu.type";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MenuDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menu: Menu | null;

  onTambah: (
    menu: Menu,
    level: number,
    jumlah: number,
    catatan: string
  ) => void;
}

export default function MenuDetailDialog({
  open,
  onOpenChange,
  menu,
  onTambah,
}: MenuDetailDialogProps) {

  // Mengurutkan level harga
  const levels = useMemo(
    () =>
      [...(menu?.levelHarga ?? [])].sort(
        (a, b) => a.level - b.level
      ),
    [menu]
  );

  // STATE
  const [levelAktif, setLevelAktif] = useState<number | null>(null);
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState("");

  // RESET FORM KETIKA DIALOG DIBUKA
  useEffect(() => {
    if (open && menu) {
      setLevelAktif(levels[0]?.level ?? null);
      setJumlah(1);
      setCatatan("");
    }
  }, [open, menu, levels]);

  if (!menu) return null;

  const menuAktif = menu;

  // LEVEL HARGA TERPILIH
  const hargaTerpilih = levels.find(
    (item) => item.level === levelAktif
  );

  const harga = hargaTerpilih?.harga ?? 0;

  // FORMAT RUPIAH
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(value);

  // STATUS MENU
  const tersedia =
    menuAktif.status === "Tersedia" &&
    hargaTerpilih !== undefined;

  // TAMBAH KE KERANJANG
  function handleTambah() {
    if (!tersedia || levelAktif === null) return;

    onTambah(
      menuAktif,
      levelAktif,
      jumlah,
      catatan.trim()
    );

    onOpenChange(false);
  }

  return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
            showCloseButton={false}
            className="
            w-[calc(100%-1rem)]
            max-w-[900px]
            max-h-[94dvh]
            overflow-y-auto
            rounded-2xl
            border-0
            p-0
            sm:w-[calc(100%-2rem)]
            lg:max-w-[1000px]
            "
        >

            {/* FOTO MENU */}
            <div className="relative h-60 w-full bg-gray-100 sm:h-72 lg:h-80">

            <Image
                src={menuAktif.foto || "/images/no-image.png"}
                alt={menuAktif.nama}
                fill
                unoptimized
                sizes="1000px"
                className="object-cover"
            />

          {/* KATEGORI */}
          <span className="absolute left-5 top-5 rounded-full bg-[#920000] px-4 py-1.5 text-xs font-bold text-white">
            {menuAktif.kategori}
          </span>

          {/* TOMBOL TUTUP */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Tutup detail menu"
            className="
              absolute right-5 top-5
              z-20 flex h-10 w-10
              items-center justify-center
              rounded-full bg-black/60
              text-white transition
              hover:bg-black/80
            "
          >
            <X size={20} />
          </button>

          {/* BADGE HABIS */}
          {menuAktif.status === "Habis" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white">
                MENU HABIS
              </span>
            </div>
          )}
        </div>

        {/* INFORMASI DAN FORM */}
        <div className="space-y-7 px-5 pb-8 pt-6 sm:px-9 sm:pb-9 lg:px-12 lg:pb-10">

          {/* INFORMASI MENU */}
          <DialogHeader className="space-y-2 text-left">

            <DialogTitle className="text-xl font-bold text-gray-900 sm:text-2xl">
              {menuAktif.nama}
            </DialogTitle>

            <DialogDescription className="max-w-3xl text-sm leading-relaxed text-gray-500">
              {menuAktif.deskripsi || "Tidak ada deskripsi menu."}
            </DialogDescription>

          </DialogHeader>

          {/* LEVEL PEDAS / PILIHAN HARGA */}
          <section>

            <div className="mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-600" />

                <h3 className="text-base font-bold text-gray-900">
                  {menuAktif.kategori === "Makanan"
                    ? "Level Pedas"
                    : "Pilihan Harga"}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {hargaTerpilih
                    ? `Rp ${formatRupiah(harga)}`
                    : "Belum tersedia"}
                </p>

                <p className="text-xs text-gray-400">
                  Harga satuan
                </p>
              </div>

            </div>

            {levels.length > 0 ? (

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {levels.map((item) => (

                  <label
                    key={item.level}
                    className={`
                      flex cursor-pointer
                      items-center justify-between
                      rounded-xl border p-4
                      transition
                      ${
                        levelAktif === item.level
                          ? "border-[#920000] bg-red-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="level-menu"
                        value={item.level}
                        checked={levelAktif === item.level}
                        onChange={() =>
                          setLevelAktif(item.level)
                        }
                        disabled={menuAktif.status === "Habis"}
                        className="h-4 w-4 accent-[#920000]"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {menuAktif.kategori === "Makanan"
                          ? `Level ${item.level}`
                          : `Pilihan ${item.level}`}
                      </span>

                    </div>

                    <span className="text-sm font-bold text-gray-800">
                      Rp {formatRupiah(item.harga)}
                    </span>

                  </label>

                ))}

              </div>

            ) : (

              <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                Harga menu belum tersedia.
              </p>

            )}

          </section>

          {/* CATATAN */}
          <section>

            <label
              htmlFor="catatan-menu"
              className="mb-2 block text-sm font-bold text-gray-900"
            >
              Catatan Pesanan
            </label>

            <textarea
              id="catatan-menu"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Tidak pakai bawang, ekstra saus..."
              maxLength={250}
              rows={3}
              className="
                w-full resize-none
                rounded-xl border border-gray-200
                bg-white px-4 py-3
                text-sm outline-none
                transition placeholder:text-gray-400
                focus:border-[#920000]
                focus:ring-2 focus:ring-[#920000]/10
              "
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {catatan.length}/250 karakter
            </p>

          </section>

          {/* JUMLAH PESANAN */}
          <section className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

            <span className="text-sm font-bold text-gray-900">
              Jumlah Pesanan
            </span>

            <div className="flex items-center gap-5">

              {/* KURANGI */}
              <button
                type="button"
                disabled={jumlah <= 1}
                onClick={() =>
                  setJumlah((prev) => Math.max(1, prev - 1))
                }
                className="
                  flex h-10 w-10 items-center
                  justify-center rounded-full
                  border border-gray-200
                  text-[#920000] hover:bg-red-50
                  disabled:opacity-30
                "
                aria-label="Kurangi jumlah"
              >
                <Minus size={18} />
              </button>

              <span className="min-w-6 text-center text-base font-bold">
                {jumlah}
              </span>

              {/* TAMBAH */}
              <button
                type="button"
                disabled={jumlah >= 99}
                onClick={() =>
                  setJumlah((prev) => Math.min(99, prev + 1))
                }
                className="
                  flex h-10 w-10 items-center
                  justify-center rounded-full
                  bg-[#920000] text-white
                  hover:bg-[#760000]
                  disabled:opacity-50
                "
                aria-label="Tambah jumlah"
              >
                <Plus size={18} />
              </button>

            </div>

          </section>

          {/* TOTAL HARGA */}
          <div className="border-t border-gray-100 pt-6">

            <div className="mb-5 flex items-center justify-between">

              <span className="text-sm font-medium text-gray-500">
                Total Harga
              </span>

              <span className="text-xl font-extrabold text-[#920000] sm:text-2xl">
                Rp {formatRupiah(harga * jumlah)}
              </span>

            </div>

            {/* TOMBOL TAMBAH KERANJANG */}
            <Button
              type="button"
              disabled={!tersedia}
              onClick={handleTambah}
              className="
                h-12 w-full rounded-xl
                bg-[#920000] text-sm font-bold
                text-white shadow-sm
                hover:bg-[#760000]
                disabled:cursor-not-allowed
                disabled:bg-gray-300
                sm:h-14 sm:text-base
              "
            >
              <ShoppingCart className="mr-2 h-5 w-5" />

              {menuAktif.status === "Habis"
                ? "Menu Sedang Habis"
                : "Tambah ke Keranjang"}

            </Button>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}
