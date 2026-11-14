
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import { QueryProvider } from "@/components/ui/providers/query-provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Login Admin | Mie Njengkelno",
  description: "Halaman login admin Mie Njengkelno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster duration={2000} position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
