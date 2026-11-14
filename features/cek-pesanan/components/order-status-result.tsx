"use client";

import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

import type { CekPesanan } from "../types/cek-pesanan.type";

import OrderStatusTimeline from "./order-status-timeline";

interface OrderStatusResultProps {
  pesanan: CekPesanan;
}

export default function OrderStatusResult({
  pesanan,
}: OrderStatusResultProps) {
  const pembayaranDikonfirmasi =
    pesanan.statusPembayaran === "DIKONFIRMASI";

  return (
    <div className="space-y-3">
      {!pembayaranDikonfirmasi ? (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Clock size={22} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-yellow-800">
                Menunggu Konfirmasi Pembayaran
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-yellow-700">
                Pembayaran Anda sedang diperiksa oleh admin.
                Status pemesanan akan ditampilkan setelah
                pembayaran dikonfirmasi.
              </p>
            </div>
          </div>
        </div>
      ) : pesanan.statusPesanan ? (
        <OrderStatusTimeline pesanan={pesanan} />
      ) : (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">
          <div className="flex items-center gap-3">
            <AlertCircle className="shrink-0 text-yellow-600" size={22} />

            <div>
              <p className="text-sm font-bold text-yellow-800">
                Menunggu Pembaruan Status
              </p>

              <p className="mt-1 text-xs text-yellow-700">
                Pembayaran sudah dikonfirmasi. Status pesanan
                sedang menunggu pembaruan dari admin.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-xs text-gray-500">
          Nomor Pesanan
        </p>

        <p className="mt-1 text-sm font-bold text-gray-900">
          {pesanan.nomorPesanan}
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Nama Pemesan
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {pesanan.nama}
        </p>

        <div className="mt-3 flex items-center gap-2">
          {pembayaranDikonfirmasi ? (
            <CheckCircle2 size={15} className="text-green-600" />
          ) : (
            <Clock size={15} className="text-yellow-600" />
          )}

          <span className="text-xs font-medium text-gray-700">
            Pembayaran: {pembayaranDikonfirmasi ? "Dikonfirmasi" : "Menunggu Konfirmasi"}
          </span>
        </div>
      </div>
    </div>
  );
}