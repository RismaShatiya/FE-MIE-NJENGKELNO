
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { menuService } from "../services/menu.service";
import type { MenuPayload } from "../types/menu.type";

const MENU_QUERY_KEY = ["menus"];

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return (
    err.response?.data?.message ||
    err.message ||
    "Terjadi kesalahan pada server."
  );
}

export function useMenus() {
  return useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: menuService.getAll,
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MenuPayload) =>
      menuService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEY });
      toast.success("Menu berhasil ditambahkan.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: MenuPayload;
    }) => menuService.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEY });
      toast.success("Menu berhasil diperbarui.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => menuService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEY });
      toast.success("Menu berhasil dihapus.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
