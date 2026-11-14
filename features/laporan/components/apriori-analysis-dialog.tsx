"use client";

import { useState } from "react";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import { Loader2, Play } from "lucide-react";

import { useRunApriori } from "../hooks/use-laporan";

const aprioriSchema = z.object({
  minSupport: z.coerce
    .number()
    .min(1, "Minimum support minimal 1%.")
    .max(100, "Minimum support maksimal 100%."),

  minConfidence: z.coerce
    .number()
    .min(1, "Minimum confidence minimal 1%.")
    .max(100, "Minimum confidence maksimal 100%."),
});

interface AprioriAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AprioriAnalysisDialog({
  open,
  onOpenChange,
}: AprioriAnalysisDialogProps) {
  const [minSupport, setMinSupport] = useState("20");
  const [minConfidence, setMinConfidence] = useState("70");

  const [errors, setErrors] = useState<{
    minSupport?: string;
    minConfidence?: string;
  }>({});

  const { mutate, isPending } = useRunApriori();

  const handleSubmit = () => {
    const validation = aprioriSchema.safeParse({
      minSupport,
      minConfidence,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors({
        minSupport: fieldErrors.minSupport?.[0],
        minConfidence: fieldErrors.minConfidence?.[0],
      });

      return;
    }

    setErrors({});

    mutate(validation.data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Analisis Algoritma Apriori
          </DialogTitle>

          <DialogDescription>
            Tentukan nilai minimum support dan confidence
            untuk mendapatkan aturan asosiasi kombinasi menu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-3">
          <div className="space-y-2">
            <Label htmlFor="minSupport">
              Minimum Support (%)
            </Label>

            <Input
              id="minSupport"
              type="number"
              min={1}
              max={100}
              value={minSupport}
              onChange={(e) => setMinSupport(e.target.value)}
              placeholder="Contoh: 20"
              disabled={isPending}
            />

            {errors.minSupport && (
              <p className="text-sm text-red-600">
                {errors.minSupport}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Minimal persentase kemunculan kombinasi menu
              dalam seluruh transaksi.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minConfidence">
              Minimum Confidence (%)
            </Label>

            <Input
              id="minConfidence"
              type="number"
              min={1}
              max={100}
              value={minConfidence}
              onChange={(e) => setMinConfidence(e.target.value)}
              placeholder="Contoh: 70"
              disabled={isPending}
            />

            {errors.minConfidence && (
              <p className="text-sm text-red-600">
                {errors.minConfidence}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Minimal tingkat kepercayaan hubungan antar menu.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-[#920000] hover:bg-[#780000]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Jalankan Analisis
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}