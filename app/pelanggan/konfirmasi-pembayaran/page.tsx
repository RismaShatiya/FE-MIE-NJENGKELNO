
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MenuPage from "@/features/menu-kami/components/menu-page";

import CheckoutConfirmation from "@/features/checkout/components/checkout-confirmation";

function KonfirmasiPembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // AMBIL NOMOR PESANAN DARI URL
  const nomorPesanan =
    searchParams.get("nomorAntrian") ||
    searchParams.get("nomorPesanan");

  // KEMBALI KE BERANDA
  const handleBackHome = () => {
    router.push("/pelanggan/menu");
  };

  return (
    <>
      {/* BACKGROUND HALAMAN MENU KAMI */}
      <div className="fixed inset-0 z-0 overflow-y-auto bg-[#fffaf7]">
        <MenuPage />
      </div>

      {/* OVERLAY BLUR */}
      <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[3px]" />

      {/* MODAL KONFIRMASI PEMBAYARAN */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-3 sm:p-5">
        {nomorPesanan ? (
          <CheckoutConfirmation
            nomorPesanan={nomorPesanan}
            onBackHome={handleBackHome}
          />
        ) : (
          <div className="flex min-h-[300px] w-full max-w-[470px] flex-col items-center justify-center border border-gray-300 bg-white p-6 text-center shadow-2xl">
            <h2 className="text-base font-bold text-gray-900">
              Nomor Pesanan Tidak Ditemukan
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Silakan lakukan checkout kembali atau periksa nomor pesanan Anda.
            </p>

            <button
              type="button"
              onClick={handleBackHome}
              className="mt-5 h-9 w-full rounded-md bg-[#920000] text-xs font-semibold text-white hover:bg-[#750000]"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function KonfirmasiPembayaranPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
          <p className="text-sm text-gray-500">
            Memuat konfirmasi pembayaran...
          </p>
        </div>
      }
    >
      <KonfirmasiPembayaranContent />
    </Suspense>
  );
}
