import { api } from "@/lib/axios";
import { Menu } from "../types/menu.type";

interface MenuResponse {
  message: string;
  data: Menu[];
}

export const getMenus = async (): Promise<Menu[]> => {
  const response = await api.get<MenuResponse>("/pelanggan/menu");

  return response.data.data;
};