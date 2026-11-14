
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Pencil,
  Trash2,
  LoaderCircle,
  ImagePlus,
  X,
  Utensils,
  Wallet,
  ImageIcon,
  Check,
  Search,
  PackageOpen,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

import {
  useMenus,
  useCreateMenu,
  useUpdateMenu,
  useDeleteMenu,
} from "../hooks/use-menu";

import type { Menu } from "../types/menu.type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ==========================================
// ZOD VALIDATION
// ==========================================

const menuSchema = z.object({
  nama: z.string().trim().min(1, "Nama menu wajib diisi."),

  kategori: z.enum(["Makanan", "Minuman", "Snack"]),

  deskripsi: z.string().trim().min(1, "Deskripsi wajib diisi."),

  status: z.enum(["Tersedia", "Habis"]),

  levelHarga: z
    .array(
      z.object({
        level: z.number().int().min(0).max(6),
        harga: z.number().positive("Harga harus lebih dari 0."),
      })
    )
    .min(1, "Masukkan minimal satu harga menu."),
});

type MenuFormValues = z.infer<typeof menuSchema>;

const DEFAULT_VALUES: MenuFormValues = {
  nama: "",
  kategori: "Makanan",
  deskripsi: "",
  status: "Tersedia",
  levelHarga: [],
};

const LEVELS = [0, 1, 2, 3, 4, 5, 6];

// ==========================================
// HELPER
// ==========================================

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(value);

// Normalisasi data levelHarga dari API.
// Format yang benar:
// [{ level: 0, harga: 5000 }]
//
// Format lama [5000] juga diantisipasi.

function normalizeLevelHarga(value: unknown): {
  level: number;
  harga: number;
}[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "number") {
        return {
          level: 0,
          harga: item,
        };
      }

      if (
        item &&
        typeof item === "object" &&
        "harga" in item
      ) {
        const data = item as {
          level?: number;
          harga: number;
        };

        return {
          level:
            typeof data.level === "number"
              ? data.level
              : 0,
          harga: Number(data.harga),
        };
      }

      return null;
    })
    .filter(
      (
        item
      ): item is { level: number; harga: number } =>
        item !== null &&
        Number.isFinite(item.harga)
    );
}

// FORMAT HARGA MENU

function getMenuPrice(menu: Menu) {
  const prices = normalizeLevelHarga(menu.levelHarga)
    .map((item) => item.harga)
    .filter((harga) => harga > 0);

  if (prices.length === 0) {
    return "Harga belum tersedia";
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max
    ? `Rp ${rupiah(min)}`
    : `Rp ${rupiah(min)} - Rp ${rupiah(max)}`;
}

// FORMAT LEVEL MENU

function getMenuLevels(menu: Menu) {
  if (menu.kategori !== "Makanan") {
    return "-";
  }

  const levels = normalizeLevelHarga(menu.levelHarga)
    .map((item) => item.level);

  if (levels.length === 0) {
    return "-";
  }

  return `Level ${Math.min(...levels)} - ${Math.max(...levels)}`;
}

// ==========================================
// FORM DIALOG
// ==========================================

function MenuFormDialog({
  open,
  onOpenChange,
  menu,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menu: Menu | null;
}) {
  const createMenu = useCreateMenu();
  const updateMenu = useUpdateMenu();

  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const kategori = form.watch("kategori");
  const levelHarga = form.watch("levelHarga");

  // ==========================================
  // RESET FORM
  // ==========================================

  useEffect(() => {
    if (!open) return;

    const hargaLama = normalizeLevelHarga(menu?.levelHarga);

    form.reset(
      menu
        ? {
            nama: menu.nama,
            kategori: menu.kategori,
            deskripsi: menu.deskripsi ?? "",
            status: menu.status,

            levelHarga:
              hargaLama.length > 0
                ? hargaLama
                : menu.kategori === "Makanan"
                  ? []
                  : [{ level: 0, harga: 0 }],
          }
        : DEFAULT_VALUES
    );

    setFoto(null);
    setFotoPreview(menu?.foto ?? null);
  }, [open, menu, form]);

  // ==========================================
  // CLEANUP PREVIEW
  // ==========================================

  useEffect(() => {
    return () => {
      if (fotoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(fotoPreview);
      }
    };
  }, [fotoPreview]);

  const saving =
    createMenu.isPending || updateMenu.isPending;

  // ==========================================
  // TOGGLE LEVEL PEDAS
  // ==========================================

  function toggleLevel(level: number, checked: boolean) {
    const current = form.getValues("levelHarga");

    const next = checked
      ? [...current, { level, harga: 0 }]
      : current.filter((item) => item.level !== level);

    form.setValue(
      "levelHarga",
      next.sort((a, b) => a.level - b.level),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  }

  // ==========================================
  // PILIH FOTO
  // ==========================================

  function selectFoto(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5 MB.");
      return;
    }

    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  }

  // ==========================================
  // SUBMIT
  // ==========================================

  async function onSubmit(values: MenuFormValues) {
    // Validasi makanan

    if (
      values.kategori === "Makanan" &&
      values.levelHarga.length === 0
    ) {
      form.setError("levelHarga", {
        message: "Pilih minimal satu level pedas.",
      });

      return;
    }

    // Validasi minuman dan snack

    if (values.kategori !== "Makanan") {
      const harga = values.levelHarga[0]?.harga;

      if (!harga || harga <= 0) {
        form.setError("levelHarga", {
          message: "Harga wajib diisi dan harus lebih dari 0.",
        });

        return;
      }
    }

    const normalizedHarga =
      values.kategori === "Makanan"
        ? values.levelHarga
        : [
            {
              level: 0,
              harga: values.levelHarga[0].harga,
            },
          ];

    const payload = {
      ...values,
      levelHarga: normalizedHarga,
      foto,
    };

    try {
      if (menu) {
        await updateMenu.mutateAsync({
          id: menu.id,
          payload,
        });

        toast.success("Menu berhasil diperbarui.");
      } else {
        await createMenu.mutateAsync(payload);

        toast.success("Menu berhasil ditambahkan.");
      }

      onOpenChange(false);
    } catch {
      // Error ditangani oleh onError di dalam hook.
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex
          h-[95dvh]
          max-h-[1000px]
          w-[calc(100%-1rem)]
          max-w-[1100px]
          flex-col
          gap-0
          overflow-hidden
          rounded-2xl
          border-0
          p-0
          shadow-2xl
          sm:w-[calc(100%-3rem)]
          sm:max-w-[1100px]
        "
      >
        {/* HEADER */}

        <DialogHeader className="relative shrink-0 overflow-hidden border-b bg-white px-6 py-6 text-left sm:px-10 sm:py-8">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#940707]/5 blur-2xl" />

          <div className="relative flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#940707]/10 text-[#940707]">
              {menu ? (
                <Pencil className="h-6 w-6" />
              ) : (
                <Plus className="h-7 w-7" />
              )}
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {menu ? "Edit Menu" : "Tambah Menu Baru"}
                </DialogTitle>

                <span className="rounded-full bg-[#940707]/10 px-3 py-1 text-xs font-semibold text-[#940707]">
                  {menu ? "EDIT MENU" : "MENU BARU"}
                </span>
              </div>

              <DialogDescription className="text-sm leading-relaxed text-gray-500 sm:text-base">
                {menu
                  ? "Perbarui informasi dan detail produk sesuai kebutuhan."
                  : "Lengkapi informasi menu untuk menambahkannya ke daftar produk."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* FORM CONTENT */}

        <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50/70 px-5 py-7 sm:px-10 sm:py-9">
          <form
            id="menu-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-5xl space-y-8"
          >
            {/* SECTION 1: INFORMASI MENU */}

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-4 border-b border-gray-100 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#940707]/10 text-[#940707]">
                  <Utensils className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Informasi Menu
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Masukkan informasi dasar makanan atau produk.
                  </p>
                </div>
              </div>

              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">

                {/* NAMA */}

                <Controller
                  control={form.control}
                  name="nama"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2.5">
                      <label className="text-sm font-semibold text-gray-700">
                        Nama Menu <span className="text-red-600">*</span>
                      </label>

                      <Input
                        {...field}
                        placeholder="Contoh: Mie Njengkelno Original"
                        className="h-12 rounded-xl border-gray-200 px-4 text-sm focus-visible:ring-[#940707]"
                      />

                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* KATEGORI */}

                <Controller
                  control={form.control}
                  name="kategori"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2.5">
                      <label className="text-sm font-semibold text-gray-700">
                        Kategori <span className="text-red-600">*</span>
                      </label>

                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          const kategoriBaru =
                            value as MenuFormValues["kategori"];

                          field.onChange(kategoriBaru);

                          form.setValue(
                            "levelHarga",
                            kategoriBaru === "Makanan"
                              ? []
                              : [{ level: 0, harga: 0 }],
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            }
                          );

                          form.clearErrors("levelHarga");
                        }}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 px-4 focus:ring-[#940707]">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Makanan">
                            Makanan
                          </SelectItem>

                          <SelectItem value="Minuman">
                            Minuman
                          </SelectItem>

                          <SelectItem value="Snack">
                            Snack
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* STATUS */}

                <Controller
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2.5">
                      <label className="text-sm font-semibold text-gray-700">
                        Status Menu <span className="text-red-600">*</span>
                      </label>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 px-4 focus:ring-[#940707]">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Tersedia">
                            Tersedia
                          </SelectItem>

                          <SelectItem value="Habis">
                            Habis
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* DESKRIPSI */}

                <Controller
                  control={form.control}
                  name="deskripsi"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2.5 sm:col-span-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Deskripsi Menu <span className="text-red-600">*</span>
                      </label>

                      <Textarea
                        {...field}
                        placeholder="Jelaskan komposisi, rasa, atau informasi menarik dari menu..."
                        className="min-h-36 resize-y rounded-xl border-gray-200 px-4 py-3 text-sm leading-relaxed focus-visible:ring-[#940707]"
                      />

                      <div className="flex items-center justify-between gap-3">
                        {fieldState.error ? (
                          <p className="text-xs text-red-600">
                            {fieldState.error.message}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400">
                            Tuliskan deskripsi singkat dan jelas.
                          </p>
                        )}

                        <span className="shrink-0 text-xs text-gray-400">
                          {field.value.length} karakter
                        </span>
                      </div>
                    </div>
                  )}
                />
              </div>
            </section>

            {/* SECTION 2: HARGA MAKANAN */}

            {kategori === "Makanan" && (
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-7 flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Wallet className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Level Pedas dan Harga
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Tentukan level pedas beserta harga setiap level.
                    </p>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <Tag className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                    <div>
                      <p className="text-sm font-semibold text-amber-900">
                        Pengaturan harga berdasarkan level
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-amber-800">
                        Pilih level yang tersedia. Masukkan harga untuk
                        setiap level yang dipilih.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {LEVELS.map((level) => {
                    const selected = levelHarga.some(
                      (item) => item.level === level
                    );

                    const priceIndex = levelHarga.findIndex(
                      (item) => item.level === level
                    );

                    return (
                      <div
                        key={level}
                        className={`rounded-xl border p-5 transition-all ${
                          selected
                            ? "border-[#940707]/40 bg-[#940707]/5 shadow-sm"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <button
                          type="button"
                          aria-label={`Pilih level ${level}`}
                          aria-pressed={selected}
                          onClick={() =>
                            toggleLevel(level, !selected)
                          }
                          className="flex w-full items-center gap-3 text-left"
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                              selected
                                ? "border-[#940707] bg-[#940707] text-white"
                                : "border-gray-300 bg-white text-transparent"
                            }`}
                          >
                            <Check className="h-4 w-4" />
                          </span>

                          <span className="flex-1">
                            <span className="block text-base font-bold text-gray-800">
                              Level {level}
                            </span>

                            <span className="mt-0.5 block text-xs text-gray-400">
                              {level === 0
                                ? "Tidak pedas"
                                : `Tingkat pedas ${level}`}
                            </span>
                          </span>

                          {selected && (
                            <span className="rounded-full bg-[#940707]/10 px-2.5 py-1 text-[10px] font-semibold text-[#940707]">
                              Dipilih
                            </span>
                          )}
                        </button>

                        <div className="mt-5">
                          <label
                            htmlFor={`harga-level-${level}`}
                            className="mb-2 block text-xs font-semibold text-gray-600"
                          >
                            Harga menu
                          </label>

                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                              Rp
                            </span>

                            <Input
                              id={`harga-level-${level}`}
                              type="number"
                              min="1"
                              step="500"
                              placeholder="Contoh: 10000"
                              disabled={!selected}
                              value={
                                selected
                                  ? levelHarga[priceIndex].harga || ""
                                  : ""
                              }
                              onChange={(event) => {
                                const price =
                                  event.target.value === ""
                                    ? 0
                                    : Number(event.target.value);

                                const next = [...levelHarga];

                                next[priceIndex] = {
                                  ...next[priceIndex],
                                  harga: price,
                                };

                                form.setValue(
                                  "levelHarga",
                                  next,
                                  {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  }
                                );
                              }}
                              className="h-11 rounded-lg border-gray-200 bg-white pl-9 text-sm focus-visible:ring-[#940707] disabled:bg-gray-100"
                            />
                          </div>

                          {selected && (
                            <p className="mt-2 text-xs text-gray-400">
                              Rp {rupiah(levelHarga[priceIndex].harga)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {form.formState.errors.levelHarga?.message && (
                  <p className="mt-4 text-sm text-red-600">
                    {form.formState.errors.levelHarga.message}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-5 py-4">
                  <span className="text-sm font-medium text-gray-500">
                    Total level dipilih
                  </span>

                  <span className="text-base font-bold text-[#940707]">
                    {levelHarga.length} Level
                  </span>
                </div>
              </section>
            )}

            {/* SECTION 3: HARGA MINUMAN DAN SNACK */}

            {kategori !== "Makanan" && (
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-7 flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Wallet className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Harga {kategori}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Masukkan satu harga untuk produk ini.
                    </p>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <Tag className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                    <div>
                      <p className="text-sm font-semibold text-amber-900">
                        Harga satuan
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-amber-800">
                        {kategori} tidak menggunakan level pedas.
                        Harga akan otomatis disimpan menggunakan level 0.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-w-md space-y-2">
                  <label
                    htmlFor="harga-produk"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Harga {kategori}{" "}
                    <span className="text-red-600">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                      Rp
                    </span>

                    <Input
                      id="harga-produk"
                      type="number"
                      min="1"
                      step="500"
                      placeholder="Contoh: 5000"
                      value={levelHarga[0]?.harga || ""}
                      onChange={(event) => {
                        const harga =
                          event.target.value === ""
                            ? 0
                            : Number(event.target.value);

                        form.setValue(
                          "levelHarga",
                          [
                            {
                              level: 0,
                              harga,
                            },
                          ],
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      className="h-12 rounded-xl border-gray-200 pl-12 text-sm focus-visible:ring-[#940707]"
                    />
                  </div>

                  {form.formState.errors.levelHarga?.message && (
                    <p className="text-xs text-red-600">
                      {form.formState.errors.levelHarga.message}
                    </p>
                  )}

                  {levelHarga[0]?.harga > 0 && (
                    <p className="text-xs text-gray-400">
                      Harga: Rp {rupiah(levelHarga[0].harga)}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    Harga disimpan sebagai level 0.
                  </p>
                </div>
              </section>
            )}

            {/* SECTION 4: FOTO MENU */}

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-4 border-b border-gray-100 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <ImageIcon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Foto Menu
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Tambahkan gambar untuk memperjelas tampilan produk.
                  </p>
                </div>
              </div>

              <div className="grid items-center gap-7 md:grid-cols-[1fr_260px]">
                <div>
                  <label
                    htmlFor="foto-menu"
                    className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-[#940707]/50 hover:bg-[#940707]/5"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#940707] shadow-sm">
                      <ImagePlus className="h-8 w-8" />
                    </div>

                    <p className="text-base font-bold text-gray-800">
                      Klik untuk mengunggah foto
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Pilih gambar dari perangkat kamu
                    </p>

                    <span className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#940707] shadow-sm">
                      Pilih Foto
                    </span>

                    <p className="mt-4 text-xs text-gray-400">
                      PNG, JPG, WEBP · Maksimal 5 MB
                    </p>
                  </label>

                  <input
                    id="foto-menu"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      selectFoto(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />

                  <p className="mt-3 text-xs leading-relaxed text-gray-400">
                    {menu
                      ? "Jika tidak mengganti foto, foto sebelumnya akan dipertahankan."
                      : "Gunakan foto produk dengan pencahayaan yang baik agar tampil menarik."}
                  </p>
                </div>

                <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                  {fotoPreview ? (
                    <>
                      <Image
                        src={fotoPreview}
                        alt="Preview foto menu"
                        fill
                        unoptimized
                        sizes="260px"
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setFoto(null);
                          setFotoPreview(null);
                        }}
                        aria-label="Hapus foto"
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3">
                        <p className="truncate text-sm font-medium text-white">
                          {foto?.name ?? "Foto saat ini"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <ImageIcon className="h-12 w-12" />

                      <span className="text-sm">
                        Preview foto menu
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* FOOTER */}

        <div className="flex shrink-0 flex-col-reverse gap-3 border-t bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="hidden text-sm text-gray-400 sm:block">
            <span className="font-semibold text-red-600">*</span>
            {" "}Wajib diisi
          </p>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl px-6"
            >
              Batal
            </Button>

            <Button
              type="submit"
              form="menu-form"
              disabled={saving}
              className="h-11 rounded-xl bg-[#940707] px-7 font-semibold text-white shadow-sm hover:bg-[#780505]"
            >
              {saving ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {menu ? "Simpan Perubahan" : "Simpan Menu"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function MenuManagement() {
  const {
    data: menus = [],
    isLoading,
    isError,
    refetch,
  } = useMenus();

  const deleteMenu = useDeleteMenu();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);
  const [search, setSearch] = useState("");

  // SEARCH

  const filteredMenus = menus.filter((menu) =>
    menu.nama.toLowerCase().includes(search.toLowerCase())
  );

  // TAMBAH

  function openCreateDialog() {
    setSelectedMenu(null);
    setDialogOpen(true);
  }

  // EDIT

  function openEditDialog(menu: Menu) {
    setSelectedMenu(menu);
    setDialogOpen(true);
  }

  // BUKA KONFIRMASI HAPUS

  function openDeleteDialog(menu: Menu) {
    setMenuToDelete(menu);
  }

  // KONFIRMASI HAPUS

  async function handleDelete() {
    if (!menuToDelete) return;

    try {
      await deleteMenu.mutateAsync(menuToDelete.id);

      toast.success("Menu berhasil dihapus.");

      setMenuToDelete(null);
    } catch {
      // Error ditangani oleh onError di dalam hook.
    }
  }


return (
  <main className="min-h-screen min-w-0 bg-[#f8f8fa]">
    <div className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-8">

        {/* HEADER HALAMAN */}
        <section className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Kelola Menu
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
            Kelola daftar makanan, minuman, dan harga menu.
          </p>
        </section>

        {/* GARIS PEMBATAS */}
        <div className="h-px w-full bg-gray-200" />

        {/* DAFTAR MENU */}
        <section className="space-y-5">

          {/* HEADER DAFTAR MENU */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <Utensils className="h-5 w-5 text-[#940707]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Daftar Menu
                </h2>

                <p className="text-xs text-gray-500">
                  Informasi makanan, minuman, harga, dan status menu.
                </p>
              </div>
            </div>

            {/* TOMBOL TAMBAH MENU */}
            <Button
              onClick={openCreateDialog}
              className="h-11 w-full gap-2 rounded-lg bg-[#940707] px-5 font-semibold text-white shadow-sm transition-all hover:bg-[#780505] sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Tambah Menu
            </Button>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* SEARCH */}
            <div className="border-b border-gray-100 p-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  placeholder="Cari nama menu..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-11 rounded-lg border-gray-200 pl-9 focus-visible:ring-[#940707]"
                />
              </div>
            </div>

            {/* LOADING */}
            {isLoading ? (
              <div className="flex min-h-64 items-center justify-center gap-2 text-muted-foreground">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Memuat data menu...
              </div>
            ) : isError ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="text-sm text-red-600">
                  Gagal mengambil data menu.
                </p>

                <Button
                  variant="outline"
                  onClick={() => refetch()}
                >
                  Coba Lagi
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#940707] hover:bg-[#940707]">
                      {[
                        "Foto",
                        "Nama Menu",
                        "Kategori",
                        "Level",
                        "Harga",
                        "Status",
                        "Aksi",
                      ].map((heading) => (
                        <TableHead
                          key={heading}
                          className="whitespace-nowrap font-semibold text-white"
                        >
                          {heading}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredMenus.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-36 text-center text-muted-foreground"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <PackageOpen className="h-7 w-7 text-gray-300" />

                            <span>
                              {search
                                ? "Menu tidak ditemukan."
                                : "Belum ada data menu."}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMenus.map((menu) => (
                        <TableRow key={menu.id}>

                          {/* FOTO */}
                          <TableCell>
                            <div className="relative h-14 w-14 overflow-hidden rounded-md bg-gray-100">
                              {menu.foto ? (
                                <Image
                                  src={menu.foto}
                                  alt={menu.nama}
                                  fill
                                  unoptimized
                                  sizes="56px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                  No foto
                                </div>
                              )}
                            </div>
                          </TableCell>

                          {/* NAMA */}
                          <TableCell className="min-w-40 font-medium">
                            {menu.nama}
                          </TableCell>

                          {/* KATEGORI */}
                          <TableCell>
                            {menu.kategori}
                          </TableCell>

                          {/* LEVEL */}
                          <TableCell className="whitespace-nowrap">
                            {getMenuLevels(menu)}
                          </TableCell>

                          {/* HARGA */}
                          <TableCell className="min-w-32 whitespace-nowrap font-semibold">
                            {getMenuPrice(menu)}
                          </TableCell>

                          {/* STATUS */}
                          <TableCell>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                menu.status === "Tersedia"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {menu.status}
                            </span>
                          </TableCell>

                          {/* AKSI */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                aria-label={`Edit ${menu.nama}`}
                                onClick={() => openEditDialog(menu)}
                                className="h-9 w-9"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>

                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                aria-label={`Hapus ${menu.nama}`}
                                disabled={deleteMenu.isPending}
                                onClick={() => openDeleteDialog(menu)}
                                className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>

                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* TOTAL MENU */}
          <div className="text-sm text-muted-foreground">
            Menampilkan {filteredMenus.length} dari {menus.length} menu
          </div>

        </section>
      </div>
    </div>

    {/* DIALOG TAMBAH DAN EDIT */}
    <MenuFormDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      menu={selectedMenu}
    />

    {/* DIALOG KONFIRMASI HAPUS */}
    <Dialog
      open={!!menuToDelete}
      onOpenChange={(open) => {
        if (!open && !deleteMenu.isPending) {
          setMenuToDelete(null);
        }
      }}
    >
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Trash2 className="h-6 w-6" />
          </div>

          <DialogTitle className="text-xl font-bold text-neutral-900">
            Hapus Menu?
          </DialogTitle>

          <DialogDescription className="text-sm leading-relaxed text-neutral-500">
            Apakah kamu yakin ingin menghapus menu{" "}
            <span className="font-semibold text-neutral-900">
              {menuToDelete?.nama}
            </span>
            ? Data menu yang sudah dihapus tidak dapat dikembalikan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={deleteMenu.isPending}
            onClick={() => setMenuToDelete(null)}
          >
            Batal
          </Button>

          <Button
            type="button"
            disabled={deleteMenu.isPending}
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {deleteMenu.isPending ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Ya, Hapus
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </main>
);

}
