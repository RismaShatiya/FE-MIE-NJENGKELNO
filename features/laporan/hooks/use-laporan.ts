import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { laporanService } from "../services/laporan-service";
import { AprioriRequest } from "../types/laporan";

// ==========================================
// HOOK MENGAMBIL DATA LAPORAN
// ==========================================

export function useLaporan() {
  return useQuery({
    queryKey: ["laporan"],
    queryFn: laporanService.getLaporan,
    staleTime: 1000 * 60,
    retry: 1,
  });
}

// ==========================================
// HOOK MENJALANKAN ANALISIS APRIORI
// ==========================================

export function useRunApriori() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AprioriRequest) =>
      laporanService.runApriori(payload),

    onSuccess: (data) => {
      toast.success(
        data.message || "Analisis Apriori berhasil dijalankan."
      );

      queryClient.invalidateQueries({
        queryKey: ["laporan"],
      });
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Gagal menjalankan analisis Apriori.";

      toast.error(message);
    },
  });
}