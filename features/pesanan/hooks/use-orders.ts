import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { orderService } from "../services/order.service";
import type { UpdateOrderPayload } from "../types/order";

// Validation Zod
export const orderSchema = z.object({
  status: z.enum(["DIPROSES", "SIAP_DIAMBIL", "SELESAI"]),
  pembayaran: z.enum(["MENUNGGU", "LUNAS"]),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

// Pesan error
const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      "Terjadi kesalahan pada server"
    );
  }

  return "Terjadi kesalahan, silakan coba lagi";
};

// GET DATA PESANAN
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
  });
}

// UPDATE PESANAN
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateOrderPayload;
    }) => orderService.updateOrder(id, payload),

    onSuccess: () => {
      toast.success("Pesanan berhasil diperbarui");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return mutation;
}