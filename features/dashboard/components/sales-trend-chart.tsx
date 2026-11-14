
"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type SalesTrendItem = {
  tanggal: string;
  totalPenjualan: number;
};

type SalesTrendChartProps = {
  data: SalesTrendItem[];
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatTanggal = (tanggal: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${tanggal}T12:00:00Z`));

export default function SalesTrendChart({
  data,
}: SalesTrendChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    tanggalLabel: formatTanggal(item.tanggal),
  }));

  return (
    <section className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">

      {/* HEADER GRAFIK */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-base font-bold text-[#171717] sm:text-lg">
          Tren Penjualan
        </h2>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Total penjualan selama 7 hari terakhir
        </p>
      </div>

      {/* AREA GRAFIK */}
      <div className="h-[260px] w-full min-w-0 sm:h-[320px] lg:h-[340px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 5,
                left: -15,
                bottom: 5,
              }}
              barCategoryGap="25%"
            >
              <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="tanggalLabel"
                tick={{ fill: "#737373", fontSize: 11 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                tickMargin={8}
                interval="preserveStartEnd"
              />

              <YAxis
                tickFormatter={(value: number) =>
                  value === 0
                    ? "0"
                    : new Intl.NumberFormat("id-ID", {
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(value)
                }
                tick={{ fill: "#737373", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={55}
              />

              <Tooltip
                cursor={{
                  fill: "#920000",
                  fillOpacity: 0.06,
                }}
                formatter={(value) => [
                  formatRupiah(Number(value)),
                  "Penjualan",
                ]}
                labelFormatter={(label) => `Tanggal: ${label}`}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: 12,
                  maxWidth: "220px",
                }}
              />

              <Bar
                dataKey="totalPenjualan"
                name="Penjualan"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
                animationDuration={700}
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={`${item.tanggal}-${index}`}
                    fill={
                      index === chartData.length - 1
                        ? "#920000"
                        : "#C95A5A"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-gray-500">
            Belum ada data penjualan untuk ditampilkan.
          </div>
        )}
      </div>
    </section>
  );
}
