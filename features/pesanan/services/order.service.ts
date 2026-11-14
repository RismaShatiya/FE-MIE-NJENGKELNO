import { api } from "@/lib/axios";
import type { Order, UpdateOrderPayload } from "../types/order";

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await api.get("/admin/pesanan");

    return response.data.data ?? response.data;
  },

  async updateOrder(
    id: number,
    payload: UpdateOrderPayload
  ): Promise<Order> {
    const response = await api.patch(
      `/admin/pesanan/${id}`,
      payload
    );

    return response.data.data ?? response.data;
  },
};