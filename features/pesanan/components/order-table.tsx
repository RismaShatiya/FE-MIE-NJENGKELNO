"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { Order } from "../types/order";

interface OrderTableProps {
  orders: Order[];
  selectedOrderId: number | null;
  onSelect: (order: Order) => void;
}

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function OrderTable({
  orders,
  selectedOrderId,
  onSelect,
}: OrderTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#940707] hover:bg-[#940707]">
            {[
              "No Pesanan",
              "Pelanggan",
              "Tanggal",
              "Total",
              "Status",
              "Pembayaran",
              "Aksi",
            ].map((heading) => (
              <TableHead
                key={heading}
                className="whitespace-nowrap text-white"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                Belum ada pesanan.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow
                key={order.id}
                className={
                  selectedOrderId === order.id
                    ? "bg-red-50"
                    : ""
                }
              >
                <TableCell className="font-medium">
                  #{order.no_pesanan}
                </TableCell>

                <TableCell>{order.pelanggan}</TableCell>

                <TableCell className="min-w-[140px]">
                  {formatDate(order.tanggal)}
                </TableCell>

                <TableCell>
                  {formatRupiah(order.total)}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {order.status.replaceAll("_", " ")}
                  </Badge>
                </TableCell>

                <TableCell>
                  {order.pembayaran === "LUNAS"
                    ? "Lunas"
                    : "Menunggu Konfirmasi"}
                </TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => onSelect(order)}
                    className="bg-[#940707] hover:bg-[#760505]"
                  >
                    Lihat
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}