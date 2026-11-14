export interface LaporanSummary {
  totalPenjualan: number;
  totalTransaksi: number;
  transaksiSelesai: number;
}

export interface AssociationRule {
  id: number;
  kombinasiMenu: string[];
  support: number;
  confidence: number;
}

export interface LaporanResponse {
  summary: LaporanSummary;
  aturanAsosiasi: AssociationRule[];
}

export interface AprioriRequest {
  minSupport: number;
  minConfidence: number;
}

export interface AprioriResponse {
  message: string;
  totalTransaksi: number;
  totalItemset: number;
  totalAturan: number;
  aturanAsosiasi: AssociationRule[];
}