
"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useUpdateOrder,
  orderSchema,
  type OrderFormValues,
} from "../hooks/use-orders";

import type { Order } from "../types/order";

// ==========================================
// TYPE
// ==========================================

interface OrderDetailFormProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
}

// ==========================================
// HELPER
// ==========================================

const formatRupiah = (value: number) =>
  `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;

const formatTanggal = (value: string) =>
  new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ==========================================
// COMPONENT
// ==========================================

export function OrderDetailForm({
  order,
  open,
  onOpenChange,
  onCancel,
}: OrderDetailFormProps) {
  const updateOrder = useUpdateOrder();

  // FORM
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      status: "DIPROSES",
      pembayaran: "MENUNGGU",
    },
  });

  // RESET FORM KETIKA PESANAN BERUBAH
  useEffect(() => {
    if (order && open) {
      form.reset({
        status: order.status,
        pembayaran: order.pembayaran,
      });
    }
  }, [order, open, form]);

  // SUBMIT
  const onSubmit = (values: OrderFormValues) => {
    if (!order) return;

    updateOrder.mutate({
      id: order.id,
      payload: values,
    });
  };

  // BELUM ADA PESANAN
  if (!order) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex
          h-[95dvh]
          max-h-[1000px]
          w-[calc(100%-1rem)]
          max-w-[1100px]
          flex-col
          gap-0
          overflow-hidden
          rounded-2xl
          border-0
          p-0
          shadow-2xl
          sm:w-[calc(100%-3rem)]
          sm:max-w-[1100px]
        "
      >
        {/* HEADER */}
        <DialogHeader className="shrink-0 border-b bg-white px-6 py-5 text-left sm:px-8">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Detail Pesanan
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500">
            Informasi dan pembaruan pesanan #{order.no_pesanan}
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50/70 px-5 py-6 sm:px-8">
          <div className="space-y-6">

            {/* INFORMASI PESANAN */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">
                Informasi Pesanan
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    No. Pesanan
                  </p>
                  <p className="font-bold">
                    #{order.no_pesanan}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Pelanggan
                  </p>
                  <p className="font-semibold">
                    {order.pelanggan}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Tanggal
                  </p>
                  <p className="text-sm font-medium">
                    {formatTanggal(order.tanggal)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Pesanan
                  </p>
                  <p className="font-bold text-[#940707]">
                    {formatRupiah(order.total)}
                  </p>
                </div>
              </div>
            </section>

            {/* DAFTAR MENU */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">
                Daftar Menu
              </h3>

              <div className="rounded-lg border">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">
                        {item.nama_menu}
                      </p>

                      <p className="text-muted-foreground">
                        Level {item.level} · {item.jumlah}x
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold">
                      {formatRupiah(item.harga * item.jumlah)}
                    </p>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between gap-3 p-3 font-bold text-[#940707]">
                  <span>Total Pesanan</span>
                  <span>{formatRupiah(order.total)}</span>
                </div>
              </div>
            </section>

            {/* FORM UPDATE */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-5 font-semibold text-gray-900">
                Pembaruan Pesanan
              </h3>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* STATUS PESANAN */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-800">
                    Status Pesanan
                  </label>

                  <Controller
                    control={form.control}
                    name="status"
                    render={({ field, fieldState }) => (
                      <div className="space-y-3">
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="DIPROSES"
                              id="status-diproses"
                            />
                            <label
                              htmlFor="status-diproses"
                              className="cursor-pointer text-sm"
                            >
                              Diproses
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="SIAP_DIAMBIL"
                              id="status-siap-diambil"
                            />
                            <label
                              htmlFor="status-siap-diambil"
                              className="cursor-pointer text-sm"
                            >
                              Siap Diambil
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="SELESAI"
                              id="status-selesai"
                            />
                            <label
                              htmlFor="status-selesai"
                              className="cursor-pointer text-sm"
                            >
                              Selesai
                            </label>
                          </div>
                        </RadioGroup>

                        {fieldState.error && (
                          <p className="text-sm text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <Separator />

                {/* PEMBAYARAN */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-800">
                    Pembayaran
                  </label>

                  <Controller
                    control={form.control}
                    name="pembayaran"
                    render={({ field, fieldState }) => (
                      <div className="space-y-3">
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="LUNAS"
                              id="pembayaran-lunas"
                            />
                            <label
                              htmlFor="pembayaran-lunas"
                              className="cursor-pointer text-sm"
                            >
                              Konfirmasi Pembayaran
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="MENUNGGU"
                              id="pembayaran-menunggu"
                            />
                            <label
                              htmlFor="pembayaran-menunggu"
                              className="cursor-pointer text-sm"
                            >
                              Tolak Pembayaran / Menunggu
                            </label>
                          </div>
                        </RadioGroup>

                        {fieldState.error && (
                          <p className="text-sm text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* TOMBOL */}
                <div className="flex justify-end gap-3 border-t pt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={updateOrder.isPending}
                  >
                    Batal
                  </Button>

                  <Button
                    type="submit"
                    disabled={updateOrder.isPending}
                    className="min-w-28 bg-[#940707] hover:bg-[#760505]"
                  >
                    {updateOrder.isPending
                      ? "Menyimpan..."
                      : "Simpan"}
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
