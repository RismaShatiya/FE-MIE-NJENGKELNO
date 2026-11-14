
import { api } from "@/lib/axios";
import type {
  Menu,
  MenuPayload,
  MenuResponse,
  SingleMenuResponse,
  ApiMessage,
} from "../types/menu.type";

function toFormData(payload: MenuPayload): FormData {
  const formData = new FormData();

  formData.append("nama", payload.nama);
  formData.append("kategori", payload.kategori);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("status", payload.status);
  formData.append("levelHarga", JSON.stringify(payload.levelHarga));

  if (payload.foto) {
    formData.append("foto", payload.foto);
  }

  return formData;
}

export const menuService = {
  async getAll(): Promise<Menu[]> {
    const response = await api.get<MenuResponse | Menu[]>("/admin/menu");

    // Mendukung response berupa array atau { data: [...] }.
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.data;
  },

  async create(payload: MenuPayload): Promise<Menu> {
    const response = await api.post<SingleMenuResponse | Menu>(
      "/admin/menu",
      toFormData(payload)
    );

    if ("id" in response.data) {
      return response.data;
    }

    return response.data.data;
  },

  async update(id: number, payload: MenuPayload): Promise<Menu> {
    const response = await api.patch<SingleMenuResponse | Menu>(
      `/admin/menu/${id}`,
      toFormData(payload)
    );

    if ("id" in response.data) {
      return response.data;
    }

    return response.data.data;
  },

  async delete(id: number): Promise<ApiMessage | void> {
    const response = await api.delete<ApiMessage>(`/admin/menu/${id}`);
    return response.data;
  },
};
