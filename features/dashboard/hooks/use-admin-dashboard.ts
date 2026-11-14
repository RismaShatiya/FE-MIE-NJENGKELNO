
"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminDashboardService } from "../services/admin-dashboard.service";

export function useAdminDashboard() {
  const lastError = useRef<unknown>(null);

  const query = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: adminDashboardService.getSummary,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 1,
  });

  const onSuccess = () => {
    lastError.current = null;
  };

  const onError = (error: Error) => {
    if (lastError.current === error) return;

    lastError.current = error;
    toast.error("Data dashboard belum bisa ditampilkan. Silakan coba lagi.");
  };

  useEffect(() => {
    if (query.data) onSuccess();
  }, [query.data]);

  useEffect(() => {
    if (query.error) onError(query.error);
  }, [query.error]);

  return query;
}
