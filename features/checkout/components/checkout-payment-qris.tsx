
"use client";

import Image from "next/image";

import {
  ArrowRight,
  ArrowLeft,
  QrCode,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { CheckoutResponse } from "../types/checkout.type";

interface CheckoutPaymentProps {
  result: CheckoutResponse;
  formatRupiah: (value: number) => string;
  processing: boolean;
  onComplete: () => Promise<void>;
  onCancel: () => Promise<void>;
}

export default function CheckoutPayment({
  result,
  formatRupiah,
  processing,
  onComplete,
  onCancel,
}: CheckoutPaymentProps) {
  return (
    <div className="space-y-3">

      <p className="text-[10px] text-gray-800">
        Silakan scan QR di bawah ini untuk melakukan pembayaran.
      </p>

      {/* INFORMASI PEMBAYARAN */}
      <div className="rounded-md border border-gray-300 px-4 py-3">

        <div className="text-center">

          <h3 className="text-sm font-bold text-gray-900">
            Mie Njengkelno
          </h3>

          <p className="mt-1 text-[10px] text-gray-600">
            Total Pembayaran
          </p>

          <p className="text-lg font-extrabold text-[#920000]">
            Rp {formatRupiah(result.total)}
          </p>

          <p className="mt-1 text-[10px] text-gray-500">
            Nomor Pesanan: {result.nomorPesanan}
          </p>

        </div>

        {/* GAMBAR QRIS */}
        <div className="mt-3 flex justify-center">

          {result.qrisUrl ? (
            <div className="relative aspect-square w-[190px] overflow-hidden rounded-md border border-gray-200 bg-white">

              <Image
                src={result.qrisUrl}
                alt="QRIS pembayaran Mie Njengkelno"
                fill
                unoptimized
                sizes="190px"
                className="object-contain p-1"
              />

            </div>
          ) : (
            <div className="flex aspect-square w-[190px] flex-col items-center justify-center rounded-md bg-gray-50 text-center">

              <QrCode size={45} className="text-gray-300" />

              <p className="mt-2 text-xs text-gray-500">
                QRIS belum tersedia.
              </p>

            </div>
          )}

        </div>

      </div>

      {/* INSTRUKSI */}
      <div className="rounded-md border border-gray-300 px-4 py-3">

        <p className="mb-2 text-[10px] font-bold text-gray-900">
          Petunjuk Pembayaran
        </p>

        <ol className="list-decimal space-y-1 pl-4 text-[10px] leading-relaxed text-gray-800">

          <li>
            Buka aplikasi e-wallet atau mobile banking.
          </li>

          <li>
            Scan kode QRIS yang tersedia.
          </li>

          <li>
            Pastikan nominal pembayaran sesuai.
          </li>

          <li>
            Selesaikan pembayaran melalui aplikasi.
          </li>

          <li>
            Setelah membayar, klik tombol Selesai.
          </li>

        </ol>

      </div>

      {/* TOMBOL SELESAI */}
      <Button
        type="button"
        onClick={onComplete}
        disabled={processing || !result.qrisUrl}
        className="h-[35px] w-full rounded-md border border-black bg-[#920000] text-[11px] font-semibold text-white hover:bg-[#760000] disabled:opacity-50"
      >
        {processing ? (
          "Memproses..."
        ) : (
          <>
            Selesai
            <ArrowRight size={15} className="ml-1" />
          </>
        )}
      </Button>

      {/* TOMBOL BATAL */}
      <Button
        type="button"
        onClick={onCancel}
        disabled={processing}
        className="h-[35px] w-full rounded-md border border-black bg-[#920000] text-[11px] font-semibold text-white hover:bg-[#760000] disabled:opacity-50"
      >
        <ArrowLeft size={15} className="mr-1" />
        Batal Pesan
      </Button>

    </div>
  );
}
