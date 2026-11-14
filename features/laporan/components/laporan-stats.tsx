import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  ShoppingBag,
  Receipt,
  CheckCircle,
} from "lucide-react";

import { LaporanSummary } from "../types/laporan";

interface LaporanStatsProps {
  data: LaporanSummary;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LaporanStats({
  data,
}: LaporanStatsProps) {
  const stats = [
    {
      label: "Total Penjualan",
      value: formatRupiah(data.totalPenjualan),
      icon: ShoppingBag,
    },
    {
      label: "Total Transaksi",
      value: data.totalTransaksi.toLocaleString("id-ID"),
      icon: Receipt,
    },
    {
      label: "Transaksi Selesai",
      value: data.transaksiSelesai.toLocaleString("id-ID"),
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="border-0 bg-[#920000] text-white shadow-sm"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/90">
                  {item.label}
                </p>

                <h3 className="text-2xl font-bold">
                  {item.value}
                </h3>
              </div>

              <Icon className="h-8 w-8 text-white/70" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}