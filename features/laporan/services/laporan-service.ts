import { api } from "@/lib/axios";

import {
  LaporanResponse,
  AprioriRequest,
  AprioriResponse,
} from "../types/laporan";

export const laporanService = {
  // Mengambil statistik laporan dan aturan asosiasi terbaru
  getLaporan: async (): Promise<LaporanResponse> => {
    const response = await api.get("/admin/laporan");

    return response.data.data;
  },

  // Menjalankan algoritma Apriori
  runApriori: async (
    payload: AprioriRequest
  ): Promise<AprioriResponse> => {
    const response = await api.post(
      "/admin/laporan/apriori",
      payload
    );

    return response.data.data;
  },
};