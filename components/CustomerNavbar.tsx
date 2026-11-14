
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import CartSheet from "@/features/keranjang/components/cart-sheet";

const navItems = [
  { label: "Home", href: "/pelanggan" },
  { label: "Tentang Kami", href: "/pelanggan/tentang-kami" },
  { label: "Menu", href: "/pelanggan/menu" },
  { label: "Cek Pesanan", href: "/pelanggan/cek-pesanan" },
  { label: "Lokasi", href: "/pelanggan/lokasi" },
];

export default function CustomerNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ================================= */}
      {/* NAVBAR UTAMA */}
      {/* ================================= */}

      <header className="sticky top-0 z-50 w-full bg-[#920000] text-white shadow-md">
        <nav className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 lg:gap-5 lg:px-10">

          {/* LOGO */}
          <Link
            href="/pelanggan"
            aria-label="Home Mie Njengkelno"
            className="relative h-[48px] w-[72px] shrink-0 sm:h-[55px] sm:w-[85px]"
          >
            <Image
              src="/logo-mie-njengkelno.png"
              alt="Logo Mie Njengkelno"
              fill
              priority
              sizes="85px"
              className="object-contain"
            />
          </Link>

          {/* NAVIGASI DESKTOP */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/10 hover:text-orange-200 xl:px-3 xl:text-[15px]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* KERANJANG DAN HAMBURGER */}
          <div className="flex shrink-0 items-center gap-3">

            {/* KERANJANG */}
            <CartSheet />

            {/* TOMBOL HAMBURGER MOBILE */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Buka navigasi"
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu size={26} />
            </button>

          </div>
        </nav>
      </header>

      {/* ================================= */}
      {/* MOBILE OVERLAY DAN SIDEBAR */}
      {/* ================================= */}

      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">

          {/* OVERLAY */}
          <button
            type="button"
            aria-label="Tutup navigasi"
            onClick={closeMenu}
            className="absolute inset-0 h-full w-full bg-black/50"
          />

          {/* MENU SIDEBAR */}
          <aside className="absolute left-0 top-0 flex h-full w-[280px] max-w-[85vw] flex-col bg-[#920000] px-5 py-6 text-white shadow-xl">

            {/* HEADER SIDEBAR */}
            <div className="mb-10 flex items-center justify-between">

              <Link
                href="/pelanggan"
                onClick={closeMenu}
                className="relative h-[55px] w-[90px]"
              >
                <Image
                  src="/logo-mie-njengkelno.png"
                  alt="Logo Mie Njengkelno"
                  fill
                  sizes="90px"
                  className="object-contain"
                />
              </Link>

              {/* TOMBOL TUTUP */}
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Tutup navigasi"
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
              >
                <X size={25} />
              </button>
            </div>

            {/* DAFTAR NAVIGASI */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors hover:bg-white/10 hover:text-orange-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

          </aside>
        </div>
      )}
    </>
  );
}
