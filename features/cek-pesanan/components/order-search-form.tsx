"use client";

import { Search, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderSearchFormProps {
  nomorPesanan: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function OrderSearchForm({
  nomorPesanan,
  loading,
  onChange,
  onSubmit,
}: OrderSearchFormProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border-r border-gray-300 bg-red-50 text-[#920000]">
          <ClipboardList size={19} />
        </div>

        <Input
          value={nomorPesanan}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Masukkan nomor pesanan"
          className="h-11 rounded-none border-0 text-sm shadow-none focus-visible:ring-0"
          disabled={loading}
        />
      </div>

      <p className="mt-1.5 pl-1 text-[10px] text-gray-500">
        Contoh: #A001
      </p>

      <Button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="mt-4 h-10 w-full bg-[#920000] text-xs font-semibold text-white hover:bg-[#750000]"
      >
        {loading ? (
          "Mencari Pesanan..."
        ) : (
          <>
            <Search size={15} className="mr-1" />
            Cek Pesanan
          </>
        )}
      </Button>
    </div>
  );
}``