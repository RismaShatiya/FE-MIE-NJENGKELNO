
export interface PaymentActionPayload {
  nomorPesanan: string;
}

export interface PaymentActionResponse {
  message: string;
  data?: {
    status: string;
    nomorPesanan: string;
  };
}
