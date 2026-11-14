
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  NotebookText,
  ClipboardList,
  FileChartColumn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Kelola Menu",
    href: "/admin/menu",
    icon: NotebookText,
  },
  {
    label: "Pesanan",
    href: "/admin/pesanan",
    icon: ClipboardList,
  },
  {
    label: "Laporan dan Analisis Apriori",
    href: "/admin/laporan",
    icon: FileChartColumn,
  },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/admin/login";
  };

  const handleNavigate = () => {
    setIsOpen(false);
  };

  // KOMPONEN MENU
  const NavigationMenu = () => (
    <nav className="flex flex-col gap-3">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleNavigate}
            className="flex w-full min-w-0 items-start gap-3 rounded-lg px-3 py-3 text-sm font-medium leading-6 text-white transition-colors hover:bg-white/10 lg:text-[15px]"
          >
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 lg:h-6 lg:w-6"
              strokeWidth={2}
            />

            <span className="min-w-0 flex-1 whitespace-normal">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  // KOMPONEN LOGO
  const Logo = () => (
    <Link href="/admin/dashboard" aria-label="Dashboard Admin">
      <Image
        src="/logo-mie-njengkelno.png"
        alt="Mie Njengkelno"
        width={180}
        height={120}
        priority
        className="h-auto w-[145px] object-contain"
      />
    </Link>
  );

  // KOMPONEN LOGOUT
  const LogoutButton = () => (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLogout}
      className="h-11 w-full justify-start gap-3 px-3 text-[15px] font-normal text-white hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-5 w-5 shrink-0" />
      Keluar
    </Button>
  );

  return (
    <>
      {/* ================================= */}
      {/* HEADER MOBILE */}
      {/* ================================= */}

      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#940707] px-4 text-white md:hidden">

        {/* TOMBOL HAMBURGER */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Buka navigasi"
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          <Menu size={27} />
        </button>

        {/* JUDUL */}
        <span className="text-base font-semibold">
          Admin
        </span>

        {/* LOGO */}
        <div className="relative h-10 w-[65px]">
          <Image
            src="/logo-mie-njengkelno.png"
            alt="Mie Njengkelno"
            fill
            sizes="65px"
            className="object-contain"
          />
        </div>
      </header>

      {/* ================================= */}
      {/* SIDEBAR DESKTOP */}
      {/* ================================= */}

      <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col overflow-y-auto bg-[#940707] px-4 py-8 text-white md:flex lg:w-[280px]">

        {/* LOGO */}
        <div className="mb-16 flex shrink-0 justify-center">
          <Logo />
        </div>

        {/* NAVIGASI */}
        <NavigationMenu />

        {/* LOGOUT */}
        <div className="mt-auto shrink-0 pt-8">
          <LogoutButton />
        </div>
      </aside>

      {/* ================================= */}
      {/* OVERLAY MOBILE */}
      {/* ================================= */}

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Tutup navigasi"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/50"
          />

          {/* DRAWER SIDEBAR */}
          <aside className="absolute left-0 top-0 flex h-full w-[280px] max-w-[85vw] flex-col overflow-y-auto bg-[#940707] px-4 py-6 text-white shadow-xl">

            {/* HEADER SIDEBAR */}
            <div className="mb-12 flex items-center justify-between">

              <Logo />

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
              >
                <X size={25} />
              </button>
            </div>

            {/* NAVIGASI */}
            <NavigationMenu />

            {/* LOGOUT */}
            <div className="mt-auto pt-8">
              <LogoutButton />
            </div>

          </aside>
        </div>
      )}
    </>
  );
}
