import {
    MapPin,
    Clock,
    Phone,
    ExternalLink,
    Navigation,
    CalendarDays,
} from "lucide-react";

const GOOGLE_MAPS_URL =
    "https://maps.app.goo.gl/XEALUXNg45hES3YHA";

const MAP_EMBED_URL =
    "https://maps.google.com/maps?q=-7.7788817,112.0270971&z=17&output=embed";

const locationDetails = [
    {
        title: "Alamat",
        icon: MapPin,
        content: (
        <>
            Gampeng, Kec. Gampengrejo,
            <br />
            Kabupaten Kediri, Jawa Timur 64182
        </>
        ),
    },
    {
        title: "Jam Operasional",
        icon: Clock,
        content: (
        <>
            Setiap hari
            <br />
            <span className="font-semibold text-[#920000]">
            12.00–20.00 WIB
            </span>
        </>
        ),
    },
    {
        title: "Hubungi Kami",
        icon: Phone,
        content: (
        <>
            09877543567
            <br />
            WhatsApp / Telepon
        </>
        ),
    },
];

export default function LokasiPage() {
    return (
        <main className="min-h-[calc(100svh-65px)] bg-[#faf8f7] text-[#242020]">
        {/* Header halaman: latar putih, tanpa area merah besar */}
        <section className="bg-[#faf8f7] px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
            <div className="mx-auto max-w-[1200px]">

            <h1 className="text-3xl font-extrabold tracking-tight text-[#242020] sm:text-4xl">
                Temukan Lokasi Kami
            </h1>
            <div className="mt-3 h-1 w-16 rounded-full bg-[#a30000]" />

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#666] sm:text-base">
                Mampir dan nikmati sensasi mie pedas favoritmu.
                Kami tunggu kedatanganmu!
            </p>
            </div>
        </section>

        {/* Konten informasi lokasi */}
        <section className="px-5 pb-10 pt-2 sm:px-8 sm:pb-12">
            <div className="mx-auto max-w-[1200px]">


            {/* Kartu informasi dan peta */}
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                {/* Kartu informasi */}
                <section className="flex flex-col overflow-hidden rounded-2xl border border-[#eee5e3] bg-white shadow-sm">
                {/* Identitas toko */}
                <div className="border-b border-[#f0e9e7] px-5 py-5 sm:px-7">
                    <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0f0] text-[#920000]">
                        <Navigation size={22} />
                    </div>

                    <div>
                        <h3 className="font-bold">
                        Mie Njengkelno
                        </h3>

                        <p className="mt-0.5 text-xs text-[#888]">
                        Kediri, Jawa Timur
                        </p>
                    </div>
                    </div>
                </div>

                {/* Detail alamat, jam buka, dan kontak */}
                <div className="flex-1 px-5 sm:px-7">
                    {locationDetails.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                        key={item.title}
                        className={`flex gap-4 py-5 ${
                            index !== locationDetails.length - 1
                            ? "border-b border-dashed border-[#e9e2e0]"
                            : ""
                        }`}
                        >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3f1] text-[#920000]">
                            <Icon size={21} />
                        </div>

                        <div className="min-w-0 pt-0.5">
                            <h4 className="text-sm font-bold">
                            {item.title}
                            </h4>

                            <p className="mt-1.5 text-sm leading-6 text-[#666]">
                            {item.content}
                            </p>
                        </div>
                        </div>
                    );
                    })}

                </div>

                {/* Tombol Google Maps */}
                <div className="px-5 pb-5 sm:px-7 sm:pb-7">
                    <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#920000] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#740000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#920000] focus-visible:ring-offset-2"
                    >
                    <MapPin size={19} />
                    Petunjuk Arah Google Maps
                    <ExternalLink size={15} />
                    </a>
                </div>
                </section>

                {/* Kartu Google Maps */}
                <section className="flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-[#eee5e3] bg-white shadow-sm sm:min-h-[480px]">
                {/* Header peta */}
                <div className="flex items-center justify-between gap-3 border-b border-[#f0e9e7] px-5 py-4 sm:px-6">
                    <div>
                    <h3 className="font-bold">
                        Peta Lokasi
                    </h3>

                    <p className="mt-1 text-xs text-[#888]">
                        Lihat posisi toko di Google Maps
                    </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#920000]">
                    <MapPin size={21} />
                    </div>
                </div>

                {/* Peta */}
                <div className="relative min-h-[350px] flex-1 bg-[#f3f0ee]">
                    <iframe
                    title="Peta lokasi Mie Njengkelno Kediri"
                    src={MAP_EMBED_URL}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    />
                </div>

                {/* Footer peta */}
                <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
                    <p className="text-xs leading-5 text-[#777]">
                    Gampengrejo, Kabupaten Kediri
                    </p>

                    <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#920000] transition hover:text-[#650000]"
                    >
                    Buka peta
                    <ExternalLink size={13} />
                    </a>
                </div>
                </section>
            </div>
            </div>
        </section>
        </main>
    );
}