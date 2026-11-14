
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Play,
  RefreshCw,
  ChartNoAxesCombined,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import LaporanStats from "@/features/laporan/components/laporan-stats";
import AssociationRulesTable from "@/features/laporan/components/association-rules-table";
import AprioriAnalysisDialog from "@/features/laporan/components/apriori-analysis-dialog";

import { useLaporan } from "@/features/laporan/hooks/use-laporan";

export default function LaporanPage() {
  const [openAnalysis, setOpenAnalysis] = useState(false);

  const {
    data,
    isFetching,
    refetch,
  } = useLaporan();

  // DATA STATISTIK
  const stats = data?.summary ?? {
    totalPenjualan: 0,
    totalTransaksi: 0,
    transaksiSelesai: 0,
  };

  // DATA ATURAN ASOSIASI
  const associationRules = data?.aturanAsosiasi ?? [];

  return (
    <div className="min-h-screen min-w-0 bg-[#f8f8fa]">
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-8">

          {/* HEADER HALAMAN */}
            <section className="space-y-2">

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Laporan dan Analisis Apriori
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
                Pantau performa penjualan dan temukan pola kombinasi menu
                berdasarkan transaksi yang terjadi.
            </p>
            </section>

          {/* GARIS PEMBATAS */}
          <div className="h-px w-full bg-gray-200" />

          {/* RINGKASAN PENJUALAN */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <ChartNoAxesCombined className="h-5 w-5 text-[#940707]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Ringkasan Penjualan
                </h2>

                <p className="text-xs text-gray-500">
                  Informasi keseluruhan aktivitas penjualan.
                </p>
              </div>
            </div>

            <LaporanStats data={stats} />
          </section>

          {/* ANALISIS POLA PEMBELIAN */}
          <section className="space-y-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                  <Sparkles className="h-5 w-5 text-[#940707]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Analisis Pola Pembelian
                  </h2>

                  <p className="text-xs text-gray-500">
                    Hasil aturan asosiasi dari algoritma Apriori.
                  </p>
                </div>
              </div>

              {/* TOMBOL JALANKAN ANALISIS */}
              <Button
                type="button"
                onClick={() => setOpenAnalysis(true)}
                className="h-11 w-full gap-2 rounded-lg bg-[#940707] px-5 font-semibold text-white shadow-sm transition-all hover:bg-[#780505] sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Jalankan Analisis
              </Button>
            </div>

            {/* INFORMASI METODE */}
            {/* TABEL ATURAN ASOSIASI */}
            <AssociationRulesTable data={associationRules} />
          </section>
        </div>
      </main>

      {/* DIALOG ANALISIS APRIORI */}
      <AprioriAnalysisDialog
        open={openAnalysis}
        onOpenChange={setOpenAnalysis}
      />
    </div>
  );
}
