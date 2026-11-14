
import Image from "next/image";
import {
  Flame,
  Soup,
  Leaf,
  BadgeDollarSign,
  ArrowRight,
  Heart,
} from "lucide-react";

const advantages = [
  {
    icon: Flame,
    title: "Level Pedas Fleksibel",
    description:
      "Pilih level pedas sesuai selera, dari yang ringan hingga menantang.",
  },
  {
    icon: Soup,
    title: "Bumbu Racikan Khas",
    description:
      "Perpaduan bumbu dan topping untuk menciptakan rasa yang istimewa.",
  },
  {
    icon: Leaf,
    title: "Bahan Berkualitas",
    description:
      "Bahan pilihan yang disiapkan untuk menyajikan hidangan terbaik.",
  },
  {
    icon: BadgeDollarSign,
    title: "Harga Bersahabat",
    description:
      "Porsi memuaskan dengan harga yang ramah di kantong.",
  },
];

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#28201e]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        {/* Judul halaman */}
        <div className="mb-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#a30000]">
            Kenali kami lebih dekat
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tentang Kami
          </h1>

          <div className="mt-3 h-1 w-16 rounded-full bg-[#a30000]" />
        </div>

        {/* Banner utama */}
        <section className="relative isolate min-h-[300px] overflow-hidden rounded-2xl bg-[#25130e] shadow-lg sm:min-h-[340px]">
          <Image
            src="/tentang-kami-banner.jpeg"
            alt="Hidangan mie pedas Mie Njengkelno"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="absolute inset-0 -z-20 object-cover object-center"
          />

          {/* Lapisan gelap untuk keterbacaan teks */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

          <div className="flex min-h-[300px] max-w-xl flex-col justify-center px-6 py-10 sm:min-h-[340px] sm:px-10 lg:px-12">
            <span className="mb-4 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Flame size={14} />
              Sensasi Pedas Khas Kediri
            </span>

            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Lebih dari Sekadar
              <span className="block text-[#ffb3a6]">
                Mie Pedas!
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/90 sm:text-base">
              Hadir dengan racikan bumbu khas, topping melimpah,
              dan pilihan level pedas yang bisa disesuaikan
              dengan selera kamu.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white">
              Dibuat untuk pencinta pedas
              <Heart size={17} className="fill-[#ffb3a6] text-[#ffb3a6]" />
            </div>
          </div>
        </section>

        {/* Cerita tentang UMKM */}
        <section className="mt-10 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-center md:gap-12">
          <div>
            <p className="mb-2 text-sm font-bold text-[#a30000]">
              Cerita Kami
            </p>

            <h2 className="max-w-lg text-2xl font-extrabold leading-snug sm:text-3xl">
              Menghadirkan Rasa,
              <span className="text-[#a30000]">
                {" "}Menciptakan Kesan.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#655653] sm:text-base">
              Mie Njengkelno adalah UMKM kuliner yang menyajikan
              mie pedas dengan cita rasa khas. Kami ingin memberikan
              pengalaman menikmati mie yang lebih seru melalui
              racikan bumbu pilihan, topping yang menggugah selera,
              serta pilihan tingkat kepedasan sesuai keinginan
              pelanggan.
            </p>

            <p className="mt-3 text-sm leading-7 text-[#655653] sm:text-base">
              Kami terus berupaya menyajikan hidangan yang lezat,
              porsi yang memuaskan, dan pengalaman pemesanan yang
              mudah bagi setiap pelanggan.
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dfd9] bg-white p-6 shadow-sm sm:p-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0ed] text-[#a30000]">
              <Heart size={25} />
            </div>

            <h3 className="text-lg font-bold">
              Komitmen Kami
            </h3>

            <p className="mt-2 text-sm leading-7 text-[#655653]">
              Menghadirkan hidangan mie pedas yang nikmat,
              pilihan menu yang beragam, dan pelayanan yang
              memudahkan pelanggan.
            </p>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#f7e7e2]">
              <div className="h-full w-2/3 rounded-full bg-[#a30000]" />
            </div>

            <p className="mt-2 text-xs text-[#82716c]">
              Rasa khas, pilihan sesuai selera.
            </p>
          </div>
        </section>

        {/* Keunggulan */}
        <section className="mt-12 sm:mt-14">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-sm font-bold text-[#a30000]">
                Kenapa Kami?
              </p>

              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Kenapa Pilih Mie Njengkelno?
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#82716c]">
              Empat hal yang membuat pengalaman makanmu lebih menyenangkan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-[#f0e2de] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#e6b6ad] hover:shadow-md sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0ed] text-[#a30000] transition-colors group-hover:bg-[#a30000] group-hover:text-white">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-base font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#82716c]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center text-xs font-bold text-[#a30000]">
                    Pilihan untuk kamu
                    <ArrowRight
                      size={14}
                      className="ml-1 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Penutup */}
        <section className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#920000] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl">
              Siap Menikmati Sensasi Pedas?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/85">
              Temukan menu favoritmu dan pilih level pedas sesuai selera.
            </p>
          </div>

          <a
            href="/pelanggan/menu"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#920000] transition hover:bg-[#fff0ed]"
          >
            Lihat Menu
            <ArrowRight size={17} />
          </a>
        </section>
      </div>
    </main>
  );
}
