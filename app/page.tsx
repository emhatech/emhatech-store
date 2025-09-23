// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { CreditCard, MessageCircle, Moon, Pause, Play, Star, Sun, Zap } from "lucide-react";
import { loadConfig, saveConfig, type PersistShape, STORAGE_KEY } from "@/lib/store";

/* ===== util kecil ===== */
const WA_NUMBER = "6285711087751";
const openWhatsApp = (product: string, price: string) => {
  const message = `Halo EMHATECH saya mau beli *${product}* seharga ${price}. Mohon info lebih lanjut.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
};
const calcDiscount = (price: string, discount: string) => {
  const p = parseInt(price.replace(/\D/g, "")); const d = parseInt(discount.replace(/\D/g, ""));
  if (!p || !d) return 0; return Math.round(((p - d) / p) * 100);
};

/* ===== UI atoms ===== */
function Card({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 shadow-lg">{children}</div>;
}
function Price({ price, discountPrice }: { price: string; discountPrice: string }) {
  return (<div className="mt-1"><span className="text-sm text-red-400 line-through mr-2">{price}</span><span className="text-lg font-bold text-emerald-400">{discountPrice}</span></div>);
}
function DiscountBadge({ price, discountPrice }: { price: string; discountPrice: string }) {
  const off = calcDiscount(price, discountPrice); if (!off) return null;
  return <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{off}%</div>;
}
function StockBar({ stock, maxStock, sold }: { stock: number; maxStock: number; sold: number }) {
  const percent = Math.max(0, Math.min(100, Math.round((stock / maxStock) * 100)));
  let color = "bg-green-500"; if (percent <= 50) color = "bg-yellow-500"; if (percent <= 20) color = "bg-red-500";
  return (
    <div className="w-full mt-2">
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden"><div className={`${color} h-2`} style={{ width: `${percent}%` }} /></div>
      <div className="flex justify-between text-xs mt-1 text-gray-400"><span>Sisa {stock} / {maxStock}</span><span>{sold}+ terjual</span></div>
    </div>
  );
}
function Thumb({ src, emoji, alt }: { src?: string; emoji?: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center shrink-0">
      {src && !broken ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" onError={() => setBroken(true)} />
      ) : (<span className="text-2xl">{emoji ?? "🖼️"}</span>)}
    </div>
  );
}

/* ===== Banner ===== */
const banners = [
  { src: "/banner1.jpg", alt: "Banner 1" },
  { src: "/banner2.jpg", alt: "Banner 2" },
  { src: "/banner3.jpg", alt: "Banner 3" },
];
function Banner({ toggleMusic, playing }: { toggleMusic: () => void; playing: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => { const t = setInterval(() => setIndex(p => (p + 1) % banners.length), 5000); return () => clearInterval(t); }, []);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
      <img src={banners[index].src} alt={banners[index].alt} className="w-full h-48 object-cover transition-all duration-700" />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6">
        <div className="overflow-hidden whitespace-nowrap mb-2">
          <h2 className="inline-block text-xl font-bold animate-marquee bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
            Tempat Top Up Games Termurah! — emhatech games —
          </h2>
        </div>
        <ul className="text-white/80 space-y-1 text-sm">
          <li className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> QRIS All Payment</li>
          <li className="flex items-center gap-2"><Zap className="w-4 h-4" /> Akses cepat & mudah</li>
          <li className="flex items-center gap-2"><Star className="w-4 h-4" /> Dipercaya ribuan gamers</li>
        </ul>
        <button onClick={toggleMusic} className="mt-3 px-3 py-1.5 bg-indigo-600 text-white rounded-lg flex items-center gap-2 text-sm">
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {playing ? "Pause Musik" : "Putar Musik"}
        </button>
      </div>
    </div>
  );
}

/* ===== Page ===== */
export default function EmhaTechStyle() {
  const [darkMode, setDarkMode] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [cfg, setCfg] = useState<PersistShape>(() => loadConfig());

  useEffect(() => { const a = new Audio("/bg-music.mp3"); a.loop = true; setAudio(a); return () => a.pause(); }, []);
  useEffect(() => {
    // sync jika ada perubahan dari admin (tab lain/another window)
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setCfg(loadConfig()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  useEffect(() => { saveConfig(cfg); }, [cfg]);

  const toggleMusic = () => { if (!audio) return; (playing ? audio.pause() : audio.play().catch(()=>{})); setPlaying(p => !p); };

  return (
    <div className={darkMode ? "min-h-screen bg-[#0a0a0f] text-zinc-200" : "min-h-screen bg-white text-black"}>
      <button onClick={() => setDarkMode(!darkMode)} className="fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-md" aria-label="Toggle theme">
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <Banner toggleMusic={toggleMusic} playing={playing} />

        {/* Flash Sale */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🔥 Flash Sale</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {cfg.flash.map(item => (
              <Card key={item.id}>
                <DiscountBadge price={item.price} discountPrice={item.discountPrice} />
                <div className="flex gap-3 items-center">
                  <Thumb src={item.image} emoji={item.emoji} alt={item.tag} />
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.tag}</div>
                    <Price price={item.price} discountPrice={item.discountPrice} />
                    <StockBar stock={item.stock} maxStock={item.maxStock} sold={item.sold} />
                  </div>
                  <button onClick={() => openWhatsApp(item.title, item.discountPrice)} className="px-3 py-2 bg-indigo-600 rounded-lg text-sm">Beli</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Seller */}
        <section>
          <h3 className="text-lg font-semibold mb-3">⭐ Produk Best Seller</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cfg.best.map(b => (
              <Card key={b.id}>
                <DiscountBadge price={b.price} discountPrice={b.discountPrice} />
                <div className="flex flex-col items-center gap-2">
                  <Thumb src={b.image} emoji={b.emoji} alt={b.title} />
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.subtitle}</div>
                  <Price price={b.price} discountPrice={b.discountPrice} />
                  <StockBar stock={b.stock} maxStock={b.maxStock} sold={b.sold} />
                  <button onClick={() => openWhatsApp(b.title, b.discountPrice)} className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm">Beli</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Tools */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🤖 AI Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cfg.ai.map(a => (
              <Card key={a.id}>
                <DiscountBadge price={a.price} discountPrice={a.discountPrice} />
                <div className="flex flex-col items-center gap-2">
                  <Thumb src={a.image} emoji={a.emoji} alt={a.title} />
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-xs text-gray-400">{a.subtitle}</div>
                  <Price price={a.price} discountPrice={a.discountPrice} />
                  <StockBar stock={a.stock} maxStock={a.maxStock} sold={a.sold} />
                  <button onClick={() => openWhatsApp(a.title, a.discountPrice)} className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm">Langganan</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Games */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🎮 Games</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cfg.games.map(g => (
              <Card key={g.code}>
                <DiscountBadge price={g.price} discountPrice={g.discountPrice} />
                <div className="flex flex-col items-center gap-2">
                  <Thumb src={g.image} emoji={g.emoji} alt={g.name} />
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-xs text-gray-400">{g.sub}</div>
                  <Price price={g.price} discountPrice={g.discountPrice} />
                  <StockBar stock={g.stock} maxStock={g.maxStock} sold={g.sold} />
                  <button onClick={() => openWhatsApp(g.name, g.discountPrice)} className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm">Top Up</button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Floating WA */}
      <button onClick={() => openWhatsApp("Customer Support", "Gratis Konsultasi")} className="fixed bottom-4 right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl z-50" aria-label="Chat WhatsApp">
        <MessageCircle className="text-white" />
      </button>
    </div>
  );
   }
      
