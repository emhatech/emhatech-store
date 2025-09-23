"use client";

import { useEffect, useState } from "react";
import { Zap, Star, MessageCircle, CreditCard, Play, Pause, Sun, Moon } from "lucide-react";

/* ================== UTIL & WHATSAPP ================== */
const WA_NUMBER = "6285711087751";
function openWhatsApp(product: string, price: string) {
  const message = `Halo EMHATECH saya mau beli *${product}* seharga ${price}. Mohon info lebih lanjut.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

function calcDiscount(price: string, discount: string): number {
  const p = parseInt(price.replace(/\D/g, ""));
  const d = parseInt(discount.replace(/\D/g, ""));
  if (!p || !d) return 0;
  return Math.round(((p - d) / p) * 100);
}

/* ================== TYPES ================== */
type FlashItem = {
  id: number;
  title: string;
  tag: string;
  emoji?: string;
  image?: string;
  price: string;
  discountPrice: string;
  stock: number;
  maxStock: number;
  sold: number;
};

type BestItem = {
  id: string;
  title: string;
  subtitle: string;
  emoji?: string;
  image?: string;
  price: string;
  discountPrice: string;
  stock: number;
  maxStock: number;
  sold: number;
};

type AiItem = BestItem & { id: string };
type GameItem = {
  name: string;
  sub: string;
  code: string;
  emoji?: string;
  image?: string;
  price: string;
  discountPrice: string;
  stock: number;
  maxStock: number;
  sold: number;
};

type PersistShape = {
  flash: FlashItem[];
  best: BestItem[];
  ai: AiItem[];
  games: GameItem[];
};

/* ================== THUMBNAIL (gambar dengan fallback) ================== */
function Thumb({ src, emoji, alt }: { src?: string; emoji?: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  const showImg = src && !broken;
  return (
    <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center shrink-0">
      {showImg ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="text-2xl select-none" aria-label={alt}>
          {emoji ?? "🖼️"}
        </span>
      )}
    </div>
  );
}

/* ================== DATA DEFAULT ================== */
// Flash Sale
const flashItemsDefault: FlashItem[] = [
  {
    id: 1,
    title: "1 Bulan (Garansi)",
    tag: "Netflix Premium",
    emoji: "🌀",
    image: "", // isi URL gambar di Edit Mode
    price: "Rp 50.000",
    discountPrice: "Rp 30.000",
    stock: 12,
    maxStock: 50,
    sold: 38,
  },
  {
    id: 2,
    title: "1 Bulan (Garansi)",
    tag: "Spotify Premium",
    emoji: "⛓️",
    image: "",
    price: "Rp 30.000",
    discountPrice: "Rp 15.000",
    stock: 7,
    maxStock: 30,
    sold: 23,
  },
];

// Best Seller
const bestSellersDefault: BestItem[] = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", emoji: "✂️", image: "", price: "Rp 20.000", discountPrice: "Rp 10.000", stock: 20, maxStock: 50, sold: 30 },
  { id: "config internet", title: "Config Internet", subtitle: "Internet", emoji: "🚀", image: "", price: "Rp 20.000", discountPrice: "Rp 10.000", stock: 15, maxStock: 40, sold: 25 },
  { id: "nordvpn", title: "NordVPN", subtitle: "1 Tahun", emoji: "🛡️", image: "", price: "Rp 80.000", discountPrice: "Rp 50.000", stock: 12, maxStock: 30, sold: 18 },
  { id: "expressvpn", title: "ExpressVPN", subtitle: "1 Bulan", emoji: "🔒", image: "", price: "Rp 90.000", discountPrice: "Rp 45.000", stock: 10, maxStock: 25, sold: 15 },
  { id: "canva", title: "Canva Pro", subtitle: "Design Tools", emoji: "🎨", image: "", price: "Rp 20.000", discountPrice: "Rp 10.000", stock: 12, maxStock: 30, sold: 18 },
];

// AI Tools
const aiToolsDefault: AiItem[] = [
  { id: "blackboxai", title: "Blackbox AI", subtitle: "Coding Tools", emoji: "🥷", image: "", price: "Rp 60.000", discountPrice: "Rp 30.000", stock: 12, maxStock: 30, sold: 18 },
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", emoji: "🧠", image: "", price: "Rp 60.000 / bulan", discountPrice: "Rp 40.000 / bulan", stock: 30, maxStock: 100, sold: 70 },
  { id: "gemini", title: "Gemini", subtitle: "AI Tools", emoji: "✨", image: "", price: "Rp 100.000 / bulan", discountPrice: "Rp 20.000 / bulan", stock: 25, maxStock: 80, sold: 55 },
  { id: "suno", title: "Suno AI", subtitle: "Music AI", emoji: "🎶", image: "", price: "Rp 250.000 / bulan", discountPrice: "Rp 200.000 / bulan", stock: 18, maxStock: 60, sold: 42 },
  { id: "klingai", title: "Kling AI", subtitle: "Video AI", emoji: "🎥", image: "", price: "Rp 100.000 / bulan", discountPrice: "Rp 70.000 / bulan", stock: 15, maxStock: 40, sold: 25 },
  { id: "pixverse", title: "Pixverse", subtitle: "Image/Video AI", emoji: "🖼️", image: "", price: "Rp 120.000 / bulan", discountPrice: "Rp 80.000 / bulan", stock: 10, maxStock: 25, sold: 15 },
];

// Games
const gamesDefault: GameItem[] = [
  { name: "Mobile Legends", sub: "Bang Bang", code: "ML", emoji: "🛡️", image: "", price: "Rp 40.000", discountPrice: "Rp 20.000", stock: 50, maxStock: 200, sold: 150 },
  { name: "FREE FIRE", sub: "Garena", code: "FF", emoji: "🔥", image: "", price: "Rp 50.000", discountPrice: "Rp 25.000", stock: 40, maxStock: 150, sold: 110 },
  { name: "PUBG Mobile", sub: "PUBG Corp", code: "PUBG", emoji: "🎯", image: "", price: "Rp 60.000", discountPrice: "Rp 30.000", stock: 35, maxStock: 100, sold: 65 },
  { name: "Genshin Impact", sub: "HoYoverse", code: "GI", emoji: "🌬️", image: "", price: "Rp 100.000", discountPrice: "Rp 50.000", stock: 12, maxStock: 50, sold: 38 },
  { name: "VALORANT", sub: "Riot Games", code: "VAL", emoji: "🎯", image: "", price: "Rp 90.000", discountPrice: "Rp 45.000", stock: 15, maxStock: 60, sold: 45 },
  { name: "MARVEL", sub: "NetEase", code: "MARV", emoji: "🦸", image: "", price: "Rp 80.000", discountPrice: "Rp 40.000", stock: 20, maxStock: 70, sold: 50 },
  { name: "Ragnarok M", sub: "Gravity", code: "RO", emoji: "⚔️", image: "", price: "Rp 70.000", discountPrice: "Rp 35.000", stock: 10, maxStock: 40, sold: 30 },
  { name: "Point Blank", sub: "Zepetto", code: "PB", emoji: "🔫", image: "", price: "Rp 60.000", discountPrice: "Rp 30.000", stock: 8, maxStock: 30, sold: 22 },
  { name: "Call of Duty", sub: "Mobile", code: "CODM", emoji: "☢️", image: "", price: "Rp 80.000", discountPrice: "Rp 40.000", stock: 9, maxStock: 30, sold: 21 },
  { name: "Roblox", sub: "Roblox Corp.", code: "RBX", emoji: "🧱", image: "", price: "Rp 30.000", discountPrice: "Rp 15.000", stock: 25, maxStock: 100, sold: 75 },
];

/* ================== PERSIST (localStorage) ================== */
const STORAGE_KEY = "emha-store-config-v1";

function mergeByIndex<T>(base: T[], saved?: T[]): T[] {
  if (!saved || !Array.isArray(saved)) return base;
  return base.map((item, i) => ({ ...(item as any), ...(saved[i] ?? {}) }));
}

function loadConfig(): PersistShape {
  if (typeof window === "undefined") {
    return { flash: flashItemsDefault, best: bestSellersDefault, ai: aiToolsDefault, games: gamesDefault };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { flash: flashItemsDefault, best: bestSellersDefault, ai: aiToolsDefault, games: gamesDefault };
    }
    const parsed = JSON.parse(raw) as Partial<PersistShape>;
    return {
      flash: mergeByIndex(flashItemsDefault, parsed.flash),
      best: mergeByIndex(bestSellersDefault, parsed.best),
      ai: mergeByIndex(aiToolsDefault, parsed.ai),
      games: mergeByIndex(gamesDefault, parsed.games),
    };
  } catch {
    return { flash: flashItemsDefault, best: bestSellersDefault, ai: aiToolsDefault, games: gamesDefault };
  }
}

function saveConfig(cfg: PersistShape) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

/* ================== UI ATOM KARTU ================== */
function Card({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 shadow-lg">{children}</div>;
}
function Price({ price, discountPrice }: { price: string; discountPrice: string }) {
  return (
    <div className="mt-1">
      <span className="text-sm text-red-400 line-through mr-2">{price}</span>
      <span className="text-lg font-bold text-emerald-400">{discountPrice}</span>
    </div>
  );
}
function DiscountBadge({ price, discountPrice }: { price: string; discountPrice: string }) {
  const off = calcDiscount(price, discountPrice);
  if (!off) return null;
  return (
    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
      -{off}%
    </div>
  );
}
function StockBar({ stock, maxStock, sold }: { stock: number; maxStock: number; sold: number }) {
  const percent = Math.max(0, Math.min(100, Math.round((stock / maxStock) * 100)));
  let color = "bg-green-500";
  if (percent <= 50) color = "bg-yellow-500";
  if (percent <= 20) color = "bg-red-500";
  return (
    <div className="w-full mt-2">
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`${color} h-2`} style={{ width: `${percent}%` }}></div>
      </div>
      <div className="flex justify-between text-xs mt-1 text-gray-400">
        <span>Sisa {stock} / {maxStock}</span>
        <span>{sold}+ terjual</span>
      </div>
    </div>
  );
}

/* ================== BANNER ================== */
const banners = [
  { src: "/banner1.jpg", alt: "Banner 1" },
  { src: "/banner2.jpg", alt: "Banner 2" },
  { src: "/banner3.jpg", alt: "Banner 3" },
];

function Banner({ toggleMusic, playing }: { toggleMusic: () => void; playing: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
      <img src={banners[index].src} alt={banners[index].alt} className="w-full h-48 object-cover transition-all duration-700" />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6">
        <div className="overflow-hidden whitespace-nowrap mb-2">
          <h2 className="inline-block text-xl font-bold animate-marquee bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
            Tempat Top Up Games Termurah! — emhatech games — Tempat Top Up Games Termurah! — emhatech games —
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

/* ================== PAGE ================== */
export default function EmhaTechStyle() {
  const [darkMode, setDarkMode] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Edit mode + data yang bisa disimpan
  const [editMode, setEditMode] = useState(false);
  const [cfg, setCfg] = useState<PersistShape>(() => loadConfig());

  useEffect(() => {
    // music
    const bgMusic = new Audio("/bg-music.mp3");
    bgMusic.loop = true;
    setAudio(bgMusic);
    return () => {
      bgMusic.pause();
    };
  }, []);

  useEffect(() => {
    // load (di client) & simpan tiap ada perubahan
    setCfg(loadConfig());
  }, []); // initial

  useEffect(() => {
    if (typeof window !== "undefined") saveConfig(cfg);
  }, [cfg]);

  const toggleMusic = () => {
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => {});
    setPlaying(!playing);
  };

  function setImage(section: keyof PersistShape, index: number, url: string) {
    setCfg((prev) => {
      const next = { ...prev, [section]: [...prev[section]] } as PersistShape;
      (next[section] as any)[index] = { ...(next[section] as any)[index], image: url };
      return next;
    });
  }

  return (
    <div className={darkMode ? "min-h-screen bg-[#0a0a0f] text-zinc-200" : "min-h-screen bg-white text-black"}>
      {/* 🔘 Dark/Light Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-md"
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Floating EDIT button */}
      <button
        onClick={() => setEditMode((e) => !e)}
        className={`fixed bottom-20 right-4 rounded-full w-12 h-12 flex items-center justify-center shadow-xl 
              ${editMode ? "bg-yellow-500" : "bg-purple-600"} text-white z-50`}
        aria-label="Edit Mode"
        title="Edit gambar produk"
      >
        ✏️
      </button>

      {/* Export / Import muncul saat Edit Mode */}
      {editMode && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "emha-config.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm"
            >
              Export JSON
            </button>

            <label className="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm cursor-pointer">
              Import JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  try {
                    const text = await f.text();
                    const parsed = JSON.parse(text);
                    // merge aman dengan default
                    const merged: PersistShape = {
                      flash: mergeByIndex(flashItemsDefault, parsed.flash),
                      best: mergeByIndex(bestSellersDefault, parsed.best),
                      ai: mergeByIndex(aiToolsDefault, parsed.ai),
                      games: mergeByIndex(gamesDefault, parsed.games),
                    };
                    setCfg(merged);
                  } catch {
                    alert("JSON tidak valid");
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <Banner toggleMusic={toggleMusic} playing={playing} />

        {/* Flash Sale */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🔥 Flash Sale</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {cfg.flash.map((item, idx) => (
              <Card key={item.id}>
                <DiscountBadge price={item.price} discountPrice={item.discountPrice} />
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <Thumb src={item.image} emoji={item.emoji} alt={item.tag} />
                    {editMode && (
                      <button
                        onClick={() => {
                          const url = prompt("Masukkan URL gambar untuk item ini:", item.image ?? "") ?? "";
                          setImage("flash", idx, url.trim());
                        }}
                        className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded bg-yellow-500 text-black"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.tag}</div>
                    <Price price={item.price} discountPrice={item.discountPrice} />
                    <StockBar stock={item.stock} maxStock={item.maxStock} sold={item.sold} />
                  </div>
                  <button
                    onClick={() => openWhatsApp(item.title, item.discountPrice)}
                    className="px-3 py-2 bg-indigo-600 rounded-lg text-sm"
                  >
                    Beli
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Seller */}
        <section>
          <h3 className="text-lg font-semibold mb-3">⭐ Produk Best Seller</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cfg.best.map((b, idx) => (
              <Card key={b.id}>
                <DiscountBadge price={b.price} discountPrice={b.discountPrice} />
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <Thumb src={b.image} emoji={b.emoji} alt={b.title} />
                    {editMode && (
                      <button
                        onClick={() => {
                          const url = prompt("URL gambar untuk item ini:", b.image ?? "") ?? "";
                          setImage("best", idx, url.trim());
                        }}
                        className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded bg-yellow-500 text-black"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.subtitle}</div>
                  <Price price={b.price} discountPrice={b.discountPrice} />
                  <StockBar stock={b.stock} maxStock={b.maxStock} sold={b.sold} />
                  <button
                    onClick={() => openWhatsApp(b.title, b.discountPrice)}
                    className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm"
                  >
                    Beli
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Tools */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🤖 AI Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cfg.ai.map((a, idx) => (
              <Card key={a.id}>
                <DiscountBadge price={a.price} discountPrice={a.discountPrice} />
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <Thumb src={a.image} emoji={a.emoji} alt={a.title} />
                    {editMode && (
                      <button
                        onClick={() => {
                          const url = prompt("URL gambar untuk item ini:", a.image ?? "") ?? "";
                          setImage("ai", idx, url.trim());
                        }}
                        className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded bg-yellow-500 text-black"
                      >
                        Edit
                
