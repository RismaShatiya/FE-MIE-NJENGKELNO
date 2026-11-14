
import type { ReactNode } from "react";
import CustomerNavbar from "@/components/CustomerNavbar";

export default function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <CustomerNavbar />
      {children}
    </>
  );
}
