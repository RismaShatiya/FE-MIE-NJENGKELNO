"use client";

import { Check, Circle, Clock } from "lucide-react";

import type { CekPesanan } from "../types/cek-pesanan.type";

interface OrderStatusTimelineProps {
  pesanan: CekPesanan;
}

const statusList = [
  {
    status: "PESANAN_MASUK",
    title: "Pesanan Masuk",
    description: "Pesanan berhasil diterima.",
  },
  {
    status: "DIPROSES",
    title: "Pesanan Diproses",
    description: "Pesanan sedang dimasak.",
  },
  {
    status: "SIAP_DIAMBIL",
    title: "Siap Diambil",
    description: "Pesanan sudah siap diambil.",
  },
  {
    status: "SELESAI",
    title: "Selesai",
    description: "Pesanan telah diambil.",
  },
] as const;

export default function OrderStatusTimeline({
  pesanan,
}: OrderStatusTimelineProps) {
  const currentIndex = statusList.findIndex(
    (item) => item.status === pesanan.statusPesanan
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-bold text-gray-900">
        Status Pesanan
      </h2>

      <div className="rounded-lg bg-[#faeeee] px-5 py-7">
        <div className="mx-auto max-w-[280px]">
          {statusList.map((item, index) => {
            const completed = index <= currentIndex;
            const active = index === currentIndex;
            const last = index === statusList.length - 1;

            return (
              <div key={item.status} className="relative flex gap-4">
                {/* GARIS TIMELINE */}
                {!last && (
                  <div
                    className={`absolute left-[15px] top-[32px] h-[50px] w-[2px] ${
                      index < currentIndex
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                )}

                {/* ICON STATUS */}
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-300 text-white"
                  }`}
                >
                  {completed ? (
                    <Check size={19} strokeWidth={3} />
                  ) : (
                    <Circle size={16} />
                  )}
                </div>

                {/* KETERANGAN */}
                <div className="min-h-[82px] pt-1">
                  <p
                    className={`text-[11px] font-bold ${
                      active
                        ? "text-[#920000]"
                        : completed
                          ? "text-gray-900"
                          : "text-gray-400"
                    }`}
                  >
                    {item.title}
                  </p>

                  <p className="mt-1 text-[9px] text-gray-500">
                    {item.description}
                  </p>

                  {active && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-green-700">
                      <Clock size={10} />
                      Status saat ini
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}