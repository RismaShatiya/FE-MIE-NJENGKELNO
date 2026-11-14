
"use client";

import { useState } from "react";
import {
  CheckSquare,
  Copy,
  Check,
  X,
  Clock,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface CheckoutConfirmationProps {
  nomorPesanan: string;
  onBackHome: () => void;
}

export default function CheckoutConfirmation({
  nomorPesanan,
  onBackHome,
}: CheckoutConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(nomorPesanan);

      setCopied(true);

      toast.success("Nomor pesanan berhasil disalin!");

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch {
      toast.error("Gagal menyalin nomor pesanan.");
    }
  };

  return (
    <div className="relative flex max-h-[85vh] min-h-[400px] w-full max-w-[470px] flex-col overflow-hidden border border-gray-300 bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex h-[52px] shrink-0 items-center justify-between bg-[#920000] px-6 text-white">

        <div className="flex items-center gap-4">

          <CheckSquare size={25} strokeWidth={2.5} />

          <h2 className="text-lg font-semibold">
            Konfirmasi Pembayaran
          </h2>

        </div>

        <button
          type="button"
          onClick={onBackHome}
          aria-label="Tutup konfirmasi"
          className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-white/10"
        >
          <X size={25} strokeWidth={2.5} />
        </button>

      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-6 py-4">

        <p className="mb-3 text-[11px] text-gray-800">
          Terima kasih! Pembayaran Anda sedang diproses oleh admin.
        </p>

        {/* STATUS */}
        <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 px-3 py-5 text-center">

          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
            <Clock size={27} className="text-yellow-600" />
          </div>

          <p className="text-sm font-bold text-gray-900">
            Menunggu Konfirmasi
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
            Pembayaran QRIS Anda sedang diperiksa oleh admin.
          </p>

          <div className="mt-4 w-full border-t border-gray-200 pt-3">

            <p className="text-[11px] font-semibold text-gray-700">
              Nomor Pesanan
            </p>

            {/* NOMOR PESANAN */}
            <div className="mt-2 flex items-center justify-center gap-2">

              <p className="break-all text-2xl font-bold text-black">
                {nomorPesanan}
              </p>

              <button
                type="button"
                onClick={handleCopyOrderNumber}
                aria-label="Salin nomor pesanan"
                title="Salin nomor pesanan"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-600 transition hover:bg-red-50 hover:text-[#920000]"
              >
                {copied ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>

            </div>

            {copied && (
              <p className="mt-1 text-[10px] text-green-600">
                Nomor pesanan berhasil disalin.
              </p>
            )}

          </div>

        </div>

        {/* INFORMASI */}
        <p className="mt-2 text-[10px] leading-relaxed text-gray-600">
          * Simpan nomor pesanan Anda untuk mengecek status pesanan.
        </p>

        {/* KEMBALI KE BERANDA */}
        <Button
          type="button"
          onClick={onBackHome}
          className="mt-4 h-[35px] w-full rounded-md bg-[#920000] text-xs font-semibold text-white hover:bg-[#750000]"
        >
          Kembali ke Beranda
        </Button>

      </div>

    </div>
  );
}
