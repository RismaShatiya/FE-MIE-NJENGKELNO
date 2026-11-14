
"use client";

import { useEffect, useState } from "react";

import {
  ChartNoAxesCombined,
  TrendingUp,
} from "lucide-react";

import DashboardStatsCards from "@/features/dashboard/components/dashboard-stats-cards";
import SalesTrendChart from "@/features/dashboard/components/sales-trend-chart";
import { useAdminDashboard } from "@/features/dashboard/hooks/use-admin-dashboard";

// HOOK TANGGAL HARI INI
function useTanggalHariIni() {
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    const updateTanggal = () => {
      setTanggal(
        new Intl.DateTimeFormat("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Jakarta",
        }).format(new Date()),
      );
    };

    updateTanggal();

    const interval = setInterval(updateTanggal, 60_000);

    return () => clearInterval(interval);
  }, []);

  return tanggal;
}

export default function DashboardManagement() {
  const { data } = useAdminDashboard();

  const tanggalHariIni = useTanggalHariIni();

  const stats = data?.harian ?? {
    totalPesanan: 0,
    transaksiSelesai: 0,
    pendapatan: 0,
    menungguVerifikasi: 0,
  };

  const salesTrend = data?.trenMingguan ?? [];

  return (
    <div className="min-h-screen min-w-0 bg-[#f8f8fa]">
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-8">

          {/* HEADER HALAMAN */}
          <section className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
              Ringkasan statistik dan performa penjualan.
            </p>
          </section>

          {/* GARIS PEMBATAS */}
          <div className="h-px w-full bg-gray-200" />

          {/* TANGGAL */}
          <section className="space-y-2">
            <p className="text-sm font-medium text-gray-500">
              Statistik Hari Ini
            </p>

            <p className="text-base font-bold capitalize text-[#940707] sm:text-lg">
              {tanggalHariIni || "Memuat tanggal..."}
            </p>
          </section>

          {/* RINGKASAN STATISTIK */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <ChartNoAxesCombined className="h-5 w-5 text-[#940707]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Ringkasan Statistik
                </h2>

                <p className="text-xs text-gray-500">
                  Informasi keseluruhan aktivitas penjualan harian.
                </p>
              </div>
            </div>

            <DashboardStatsCards stats={stats} />
          </section>

          {/* TREN PENJUALAN */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <TrendingUp className="h-5 w-5 text-[#940707]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Tren Penjualan
                </h2>

                <p className="text-xs text-gray-500">
                  Grafik perkembangan penjualan selama satu minggu.
                </p>
              </div>
            </div>

            <SalesTrendChart data={salesTrend} />
          </section>

        </div>
      </main>
    </div>
  );
}
