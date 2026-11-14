
"use client";

import { useCekPesanan } from "@/features/cek-pesanan/hooks/use-cek-pesanan";
import OrderSearchForm from "@/features/cek-pesanan/components/order-search-form";
import OrderStatusResult from "@/features/cek-pesanan/components/order-status-result";

import { AlertCircle, PackageSearch } from "lucide-react";

export default function CekPesananPage() {
  const {
    nomorPesanan,
    setNomorPesanan,
    pesanan,
    loading,
    handleCekPesanan,
  } = useCekPesanan();

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#28201e]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">

        {/* Judul halaman */}
        <div className="mb-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#a30000]">
            Pantau pesananmu
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Cek Pesanan
          </h1>

          <div className="mt-3 h-1 w-16 rounded-full bg-[#a30000]" />

          <p className="mt-3 max-w-lg text-sm leading-7 text-[#655653]">
            Masukkan nomor pesanan yang Anda gunakan saat melakukan
            pemesanan untuk melihat perkembangan status pesanan Anda.
          </p>
        </div>

        {/* Konten utama */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Kolom kiri */}
          <div className="space-y-5">

            {/* Form pencarian */}
            <OrderSearchForm
              nomorPesanan={nomorPesanan}
              loading={loading}
              onChange={setNomorPesanan}
              onSubmit={handleCekPesanan}
            />

            {/* Hasil pesanan mobile */}
            {pesanan && (
              <div className="lg:hidden">
                <OrderStatusResult pesanan={pesanan} />
              </div>
            )}

            {/* Banner */}
            <section className="relative flex min-h-[150px] items-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#350900] via-[#752500] to-[#d18a37] px-6 py-7 shadow-sm sm:px-8">
              <div className="max-w-sm">
                <p className="text-xl font-extrabold text-white sm:text-2xl">
                  Mie Njengkelno
                </p>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Terima kasih telah memesan. Selamat menikmati
                  hidangan khas kami!
                </p>

                <div className="mt-4 h-1 w-12 rounded-full bg-[#ffb3a6]" />
              </div>
            </section>

            {/* Informasi bantuan */}
            <div className="flex items-start gap-3 rounded-2xl border border-[#f0dfd9] bg-white p-4 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff0ed] text-[#a30000]">
                <AlertCircle size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#28201e]">
                  Butuh Bantuan?
                </p>

                <p className="mt-1 text-xs leading-6 text-[#82716c]">
                  Jika mengalami kendala, silakan hubungi kami
                  melalui WhatsApp di{" "}
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#a30000] hover:underline"
                  >
                    0812 3456 7890
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Kolom kanan desktop */}
          <div className="hidden lg:block">
            {pesanan ? (
              <OrderStatusResult pesanan={pesanan} />
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#f0dfd9] bg-white p-7 text-center shadow-sm">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0ed] text-[#a30000]">
                  <PackageSearch size={32} strokeWidth={1.7} />
                </div>

                <h2 className="text-lg font-bold text-[#28201e]">
                  Status Pesanan
                </h2>

                <p className="mt-2 max-w-[250px] text-sm leading-6 text-[#82716c]">
                  Masukkan nomor pesanan untuk melihat perkembangan
                  dan status pesanan Anda.
                </p>

                <div className="mt-5 h-1 w-12 rounded-full bg-[#a30000]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
