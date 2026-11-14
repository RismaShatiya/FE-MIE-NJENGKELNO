import { api } from "@/lib/axios";
import type {
    AdminLoginPayload,
    AdminLoginResponse,
} from "../types/admin-login.type";

export const adminLoginService = {
    login: async (
        payload: AdminLoginPayload,
    ): Promise<AdminLoginResponse> => {
        const response = await api.post<AdminLoginResponse>(
        "/auth/admin/login",
        payload,
        );

        return response.data;
    },
};