
"use client";

import {
  ShoppingBag,
  CircleCheck,
  Wallet,
  Clock,
} from "lucide-react";

import type { DashboardStats } from "../types/admin-dashboard.type";

interface Props {
  stats: DashboardStats;
}

const cards = [
  {
    key: "totalPesanan",
    title: "Total Pesanan",
    icon: ShoppingBag,
    format: (value: number) => value.toLocaleString("id-ID"),
  },
  {
    key: "transaksiSelesai",
    title: "Transaksi Selesai",
    icon: CircleCheck,
    format: (value: number) => value.toLocaleString("id-ID"),
  },
  {
    key: "pendapatan",
    title: "Pendapatan",
    icon: Wallet,
    format: (value: number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(value),
  },
  {
    key: "menungguVerifikasi",
    title: "Menunggu Verifikasi",
    icon: Clock,
    format: (value: number) => value.toLocaleString("id-ID"),
  },
] satisfies {
  key: keyof DashboardStats;
  title: string;
  icon: typeof ShoppingBag;
  format: (value: number) => string;
}[];

export default function DashboardStatsCards({ stats }: Props) {
  return (
    <section
      aria-label="Statistik penjualan hari ini"
      className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.key}
            className="flex min-h-[125px] min-w-0 items-start justify-between gap-3 rounded-xl border border-red-900/10 bg-[#A00000] p-4 text-white shadow-sm transition-shadow duration-200 hover:shadow-md sm:min-h-[140px] sm:p-5"
          >
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
              <p className="text-sm font-semibold leading-5 text-white">
                {card.title}
              </p>

              <p className="break-words text-xl font-extrabold leading-tight tracking-tight sm:text-2xl lg:text-[28px]">
                {card.format(stats[card.key])}
              </p>
            </div>

            <Icon
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
              className="mt-1 shrink-0 text-white/90"
            />
          </article>
        );
      })}
    </section>
  );
}
