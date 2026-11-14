
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-62px)] items-center justify-center overflow-hidden bg-[#fffaf5]">
      {/* Background ilustrasi makanan */}
      <Image
        src="/mie-njengkelno-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Konten utama */}
      <section className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-[430px] text-center md:translate-x-8">
          <h1 className="text-[30px] font-extrabold uppercase leading-[1.6] tracking-tight text-[#920000] sm:text-[32px] md:text-[34px]">
            Sensasi Pedas
            <br />
            Mie Njengkelno
            <br />
            Kediri
          </h1>

          <Link
            href="/menu"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#920000] px-5 py-2.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#750000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#920000] focus-visible:ring-offset-2"
          >
            Pesan Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}
