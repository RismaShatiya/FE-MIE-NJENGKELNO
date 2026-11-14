import { z } from "zod";

export const statusPembayaranSchema = z.enum([
  "MENUNGGU_KONFIRMASI",
  "DIKONFIRMASI",
]);

export const statusPesananSchema = z.enum([
  "PESANAN_MASUK",
  "DIPROSES",
  "SIAP_DIAMBIL",
  "SELESAI",
]);

export const cekPesananSchema = z.object({
  nomorPesanan: z.string(),
  nama: z.string(),
  statusPembayaran: statusPembayaranSchema,
  statusPesanan: statusPesananSchema.nullable(),
  createdAt: z.string().optional(),
});

export type CekPesanan = z.infer<typeof cekPesananSchema>;

export interface CekPesananResponse {
  message: string;
  data: CekPesanan;
}