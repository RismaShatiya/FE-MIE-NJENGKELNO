"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoaderCircle,
  LockKeyhole,
  UserRound,
  UsersRound,
} from "lucide-react";

import { useAdminLogin } from "../hooks/use-admin-login";
import type { AdminLoginPayload } from "../types/admin-login.type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Username wajib diisi."),
  password: z.string().min(1, "Password wajib diisi."),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const loginMutation = useAdminLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: AdminLoginFormValues) => {
    const payload: AdminLoginPayload = {
      username: values.username,
      password: values.password,
    };

    loginMutation.mutate(payload);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white bg-[url('/admin-login-bg.png')] bg-cover bg-center bg-no-repeat px-4 py-8">
      <section className="w-full max-w-[395px] rounded-[30px] border border-neutral-300 bg-white/95 px-7 py-10 shadow-sm backdrop-blur-sm sm:px-9 sm:py-12">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <UsersRound
              className="h-10 w-10 text-red-700"
              strokeWidth={2.5}
            />
          </div>

          <h1 className="text-[22px] font-bold leading-tight text-neutral-800">
            Login <span className="text-red-700">Admin</span>
          </h1>

          <p className="mt-1 text-xs leading-4 text-neutral-600">
            Masuk untuk mengelola sistem
            <br />
            Mie Njengkelno
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <div className="relative">
              <UserRound className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-red-700" />

              <Input
                {...register("username")}
                autoComplete="username"
                placeholder="Username"
                aria-label="Username"
                aria-invalid={!!errors.username}
                disabled={loginMutation.isPending}
                className="h-10 border-neutral-300 bg-neutral-50 pl-10 text-sm placeholder:text-neutral-400 focus-visible:ring-red-700"
              />
            </div>

            {errors.username && (
              <p className="text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <LockKeyhole className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-red-700" />

              <Input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                aria-invalid={!!errors.password}
                disabled={loginMutation.isPending}
                className="h-10 border-neutral-300 bg-neutral-50 pl-10 text-sm placeholder:text-neutral-400 focus-visible:ring-red-700"
              />
            </div>

            {errors.password && (
              <p className="text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="h-9 w-full bg-red-800 text-sm font-medium text-white hover:bg-red-900"
          >
            {loginMutation.isPending ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}
