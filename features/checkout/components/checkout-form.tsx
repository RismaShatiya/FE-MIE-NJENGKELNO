"use client";

import { useState } from "react";
import { User, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutFormProps {
  submitting: boolean;
  onSubmit: (data: { nama: string; noHp: string }) => void;
}

export default function CheckoutForm({
  submitting,
  onSubmit,
}: CheckoutFormProps) {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      nama,
      noHp,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nama" className="text-sm font-semibold">
          Nama Lengkap
        </Label>

        <div className="relative">
          <User
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            id="nama"
            name="nama"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
            placeholder="Masukkan nama lengkap"
            className="h-11 pl-10"
            required
            minLength={3}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="noHp" className="text-sm font-semibold">
          Nomor HP
        </Label>

        <div className="relative">
          <Phone
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            id="noHp"
            name="noHp"
            type="tel"
            inputMode="numeric"
            value={noHp}
            onChange={(event) =>
              setNoHp(event.target.value.replace(/\D/g, "").slice(0, 15))
            }
            placeholder="Contoh: 081234567890"
            className="h-11 pl-10"
            required
            minLength={10}
            maxLength={15}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="rounded-lg bg-red-50 p-3 text-xs leading-relaxed text-gray-600">
        Silakan lakukan pembayaran menggunakan QRIS sesuai nominal pesanan.
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="h-11 w-full rounded-lg bg-[#920000] font-semibold text-white hover:bg-[#760000]"
      >
        {submitting ? "Memproses Pesanan..." : "Bayar Sekarang →"}
      </Button>
    </form>
  );
}