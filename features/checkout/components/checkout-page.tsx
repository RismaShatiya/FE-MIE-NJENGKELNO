
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import MenuPage from "@/features/menu-kami/components/menu-page";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCheckout } from "../hooks/use-checkout";
import { useCheckoutPayment } from "../hooks/use-checkout-payment-qris";

import CheckoutPayment from "./checkout-payment-qris";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    loading,
    submitting,
    checkoutResult,
    subtotal,
    formatRupiah,
    submitCheckout,
  } = useCheckout();

  const {
    processing,
    handleConfirmPayment,
    handleCancelPayment,
  } = useCheckoutPayment(
    checkoutResult?.nomorPesanan ?? null
  );

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");

  // SUBMIT CHECKOUT
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (nama.trim().length < 3) {
      toast.error("Nama lengkap minimal 3 karakter.");
      return;
    }

    if (!/^08[0-9]{8,13}$/.test(noHp)) {
      toast.error("Nomor HP tidak valid.");
      return;
    }

    await submitCheckout({
      nama: nama.trim(),
      noHp,
    });
  };

  // KONFIRMASI PEMBAYARAN
  const handleComplete = async () => {
    if (!checkoutResult?.nomorPesanan) {
      toast.error("Nomor pesanan tidak ditemukan.");
      return;
    }

    const success = await handleConfirmPayment();

    if (!success) return;

    router.replace(
      `/pelanggan/konfirmasi-pembayaran?nomorPesanan=${encodeURIComponent(
        checkoutResult.nomorPesanan
      )}`
    );
  };

  // BATALKAN PEMBAYARAN
  const handleCancel = async () => {
    const success = await handleCancelPayment();

    if (!success) return;

    router.replace("/pelanggan/menu");
  };

  // KEMBALI
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {/* BACKGROUND HALAMAN MENU */}
      <div className="fixed inset-0 z-0 overflow-y-auto bg-[#fffaf7]">
        <MenuPage />
      </div>

      {/* OVERLAY BLUR */}
      <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[3px]" />

      {/* MODAL CHECKOUT / QRIS */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-3 sm:p-5">

        <div className="my-auto w-full max-w-[500px] overflow-hidden border border-[#555] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex h-[53px] shrink-0 items-center justify-between bg-[#920000] px-5 text-white">

            <div className="flex items-center gap-3">
              <CreditCard size={21} strokeWidth={1.8} />

              <h1 className="text-lg font-bold">
                {checkoutResult
                  ? "Pembayaran QRIS"
                  : "Checkout"}
              </h1>
            </div>

            <button
              type="button"
              onClick={
                checkoutResult
                  ? handleCancel
                  : handleBack
              }
              disabled={submitting || processing}
              aria-label="Tutup"
              className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <X size={23} strokeWidth={3} />
            </button>

          </div>

          {/* CONTENT */}
          <div className="max-h-[calc(100dvh-90px)] overflow-y-auto px-5 pb-6 pt-3">

            {loading ? (

              <div className="py-16 text-center text-sm text-gray-400">
                Memuat data checkout...
              </div>

            ) : checkoutResult ? (

              /* TAHAP 3: PEMBAYARAN QRIS */
              <CheckoutPayment
                result={checkoutResult}
                formatRupiah={formatRupiah}
                processing={processing}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />

            ) : items.length === 0 ? (

              /* KERANJANG KOSONG */
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                <h2 className="text-base font-bold text-gray-900">
                  Keranjang Masih Kosong
                </h2>

                <p className="mt-2 text-xs text-gray-500">
                  Silakan tambahkan menu terlebih dahulu.
                </p>

                <Button
                  type="button"
                  onClick={() => router.push("/pelanggan/menu")}
                  className="mt-5 bg-[#920000] hover:bg-[#760000]"
                >
                  Lihat Menu
                </Button>

              </div>

            ) : (

              /* TAHAP 2: CHECKOUT */
              <form onSubmit={handleSubmit}>

                {/* DATA PEMESAN */}
                <section>

                  <h2 className="mb-2 text-[13px] font-bold text-[#252525]">
                    Data Pemesan
                  </h2>

                  <div className="rounded-lg border border-gray-300 px-3.5 py-3">

                    <div className="space-y-1">

                      <Label
                        htmlFor="nama"
                        className="text-[10px] font-normal"
                      >
                        Nama Lengkap
                      </Label>

                      <Input
                        id="nama"
                        name="nama"
                        value={nama}
                        onChange={(event) =>
                          setNama(event.target.value)
                        }
                        placeholder="Masukkan nama lengkap"
                        disabled={submitting}
                        required
                        minLength={3}
                        className="h-[30px] rounded-md border-gray-300 px-2.5 text-xs shadow-none focus-visible:ring-[#920000]"
                      />

                    </div>

                    <div className="mt-2 space-y-1">

                      <Label
                        htmlFor="noHp"
                        className="text-[10px] font-normal"
                      >
                        Nomor HP
                      </Label>

                      <Input
                        id="noHp"
                        name="noHp"
                        type="tel"
                        inputMode="numeric"
                        value={noHp}
                        onChange={(event) =>
                          setNoHp(
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 15)
                          )
                        }
                        placeholder="Contoh: 081234567890"
                        disabled={submitting}
                        required
                        minLength={10}
                        maxLength={15}
                        className="h-[30px] rounded-md border-gray-300 px-2.5 text-xs shadow-none focus-visible:ring-[#920000]"
                      />

                    </div>

                  </div>

                  <p className="mt-1.5 text-[10px] text-gray-600">
                    * Silakan bayar melalui QRIS sesuai nominal pesanan.
                  </p>

                </section>

                {/* DETAIL PESANAN */}
                <section className="mt-3">

                  <h2 className="mb-2 text-[13px] font-bold text-[#252525]">
                    Detail Pesanan
                  </h2>

                  <div className="rounded-lg border border-gray-300 px-4 py-3">

                    {/* HEADER TABEL */}
                    <div className="grid grid-cols-[minmax(0,1fr)_65px_35px_65px] gap-1 border-b border-gray-200 pb-2 text-[10px] font-semibold text-gray-500">

                      <span>Menu</span>
                      <span>Level</span>
                      <span className="text-center">Jml</span>
                      <span className="text-right">Harga</span>

                    </div>

                    {/* DAFTAR MENU */}
                    <div className="min-h-[65px] space-y-2 pt-2">

                      {items.map((item, index) => (
                        <div
                          key={`${item.id}-${item.level}-${item.catatan ?? ""}-${index}`}
                          className="grid grid-cols-[minmax(0,1fr)_65px_35px_65px] items-start gap-1 text-[10px] text-gray-800"
                        >

                          <span className="break-words pr-1">
                            {item.nama}

                            {item.catatan && (
                              <span className="block text-[9px] text-gray-400">
                                Catatan: {item.catatan}
                              </span>
                            )}
                          </span>

                          <span>Level {item.level}</span>

                          <span className="text-center">
                            {item.jumlah}
                          </span>

                          <span className="text-right">
                            {formatRupiah(
                              item.harga * item.jumlah
                            )}
                          </span>

                        </div>
                      ))}

                    </div>

                    {/* SUBTOTAL DAN TOTAL */}
                    <div className="mt-6 space-y-1.5 border-t border-gray-200 pt-3">

                      <div className="flex justify-between text-[10px] text-gray-700">
                        <span>Subtotal</span>
                        <span>Rp {formatRupiah(subtotal)}</span>
                      </div>

                      <div className="flex justify-between text-[11px] font-extrabold text-gray-900">
                        <span>Total</span>
                        <span>Rp {formatRupiah(subtotal)}</span>
                      </div>

                    </div>

                  </div>

                </section>

                {/* METODE PEMBAYARAN */}
                <input
                  type="hidden"
                  name="metodePembayaran"
                  value="QRIS"
                />

                {/* TOMBOL */}
                <div className="mt-7 space-y-2">

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-[35px] w-full rounded-md border border-black bg-[#920000] text-[11px] font-semibold text-white hover:bg-[#760000] disabled:opacity-50"
                  >
                    {submitting ? (
                      "Memproses Pesanan..."
                    ) : (
                      <>
                        Bayar Sekarang
                        <ArrowRight size={15} className="ml-1" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleBack}
                    disabled={submitting}
                    className="h-[35px] w-full rounded-md border border-black bg-[#920000] text-[11px] font-semibold text-white hover:bg-[#760000]"
                  >
                    <ArrowLeft size={15} className="mr-1" />
                    Kembali ke Keranjang Belanja
                  </Button>

                </div>

              </form>

            )}

          </div>

        </div>

      </div>
    </>
  );
}
