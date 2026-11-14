import { api } from "@/lib/axios";

import {
  cekPesananSchema,
  type CekPesanan,
  type CekPesananResponse,
} from "../types/cek-pesanan.type";

export const getCekPesanan = async (
  nomorPesanan: string
): Promise<CekPesanan> => {
  const response = await api.get<CekPesananResponse>(
    "/pelanggan/cek-pesanan",
    {
      params: {
        nomorPesanan,
      },
    }
  );

  return cekPesananSchema.parse(response.data.data);
};