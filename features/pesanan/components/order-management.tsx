
"use client";

import { useState } from "react";

import {
  LoaderCircle,
  ClipboardList,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { OrderTable } from "@/features/pesanan/components/order-table";
import { OrderDetailForm } from "@/features/pesanan/components/order-detail-form";

import { useOrders } from "@/features/pesanan/hooks/use-orders";
import type { Order } from "@/features/pesanan/types/order";

// ==========================================
// COMPONENT
// ==========================================

export function OrderManagement() {
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useOrders();

  // STATE PESANAN TERPILIH
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  // STATE DIALOG
  const [detailOpen, setDetailOpen] = useState(false);

  // BUKA DETAIL PESANAN
  function handleSelectOrder(order: Order) {
    setSelectedOrder(order);
    setDetailOpen(true);
  }

  // TUTUP DETAIL PESANAN
  function handleCloseDetail() {
    setDetailOpen(false);
    setSelectedOrder(null);
  }

  return (
    <div className="min-h-screen min-w-0 bg-[#f8f8fa]">
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-8">

          {/* HEADER HALAMAN */}
          <section className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Pesanan
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
              Kelola pesanan dan konfirmasi pembayaran pelanggan dengan mudah.
            </p>
          </section>

          {/* GARIS PEMBATAS */}
          <div className="h-px w-full bg-gray-200" />

          {/* DAFTAR PESANAN */}
          <section className="space-y-5">

            {/* HEADER SECTION */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                  <ClipboardList className="h-5 w-5 text-[#940707]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Daftar Pesanan
                  </h2>

                  <p className="text-xs text-gray-500">
                    Pilih pesanan untuk melihat detail dan memperbarui status.
                  </p>
                </div>
              </div>

              {!isLoading && !isError && (
                <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <ShoppingBag className="h-4 w-4 text-[#940707]" />
                  <span className="text-sm font-medium text-gray-600">
                    Total Pesanan:
                  </span>
                  <span className="text-sm font-bold text-[#940707]">
                    {orders.length}
                  </span>
                </div>
              )}
            </div>

            {/* TABEL PESANAN */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              {/* HEADER CARD */}
              <div className="flex flex-col gap-1 border-b border-gray-100 px-4 py-4 sm:px-6">
                <h3 className="text-sm font-semibold text-gray-800">
                  Data Pesanan Pelanggan
                </h3>

                <p className="text-xs text-gray-500">
                  Informasi pesanan yang masuk dan status pemrosesannya.
                </p>
              </div>

              {/* LOADING DAN DATA */}
              {isLoading ? (
                <div className="flex min-h-64 items-center justify-center gap-3 text-muted-foreground">
                  <LoaderCircle className="h-5 w-5 animate-spin text-[#940707]" />
                  <span className="text-sm">
                    Memuat data pesanan...
                  </span>
                </div>
              ) : isError ? (
                <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <ClipboardList className="h-6 w-6 text-red-600" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Gagal Memuat Data
                    </p>

                    <p className="text-sm text-gray-500">
                      Gagal mengambil data pesanan.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#940707] text-[#940707] hover:bg-red-50 hover:text-[#780505]"
                    onClick={() => refetch()}
                  >
                    Coba Lagi
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto p-4 sm:p-6">
                  <OrderTable
                    orders={orders}
                    selectedOrderId={selectedOrder?.id ?? null}
                    onSelect={handleSelectOrder}
                  />
                </div>
              )}

              {/* TOTAL PESANAN */}
              {!isLoading && !isError && (
                <div className="flex flex-col gap-1 border-t border-gray-100 bg-gray-50/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-xs text-gray-500">
                    Menampilkan{" "}
                    <span className="font-semibold text-gray-800">
                      {orders.length}
                    </span>{" "}
                    pesanan
                  </p>

                  <p className="text-xs text-gray-400">
                    Data pesanan pelanggan
                  </p>
                </div>
              )}

            </div>
          </section>

        </div>
      </main>

      {/* DIALOG DETAIL PESANAN */}
      <OrderDetailForm
        order={selectedOrder}
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDetail();
          } else {
            setDetailOpen(true);
          }
        }}
        onCancel={handleCloseDetail}
      />
    </div>
  );
}
