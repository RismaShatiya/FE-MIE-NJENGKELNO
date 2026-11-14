"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { adminLoginService } from "../services/admin-login.service";
import type { AdminLoginPayload } from "../types/admin-login.type";

export function useAdminLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: AdminLoginPayload) =>
        adminLoginService.login(payload),

        onSuccess: (data) => {
        localStorage.setItem("access_token", data.access_token);

        toast.success(data.message || "Login berhasil.");

        router.replace("/admin/dashboard");
        },

        onError: (error: unknown) => {
        const message =
            typeof error === "object" &&
            error !== null &&
            "response" in error
            ? (
                error as {
                    response?: {
                    data?: { message?: string };
                    };
                }
                ).response?.data?.message
            : undefined;

        toast.error(message || "Username atau password salah.");
        },
    });
}