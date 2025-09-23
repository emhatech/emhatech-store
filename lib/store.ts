// lib/store.ts
"use client";

export const STORAGE_KEY = "emha-store-config-v1";
export const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "emha123"; // ganti di env kalau perlu

/* ===== Types ===== */
export type FlashItem = {
  id: number; title: string; tag: string; emoji?: string; image?: string;
  price: string; discountPrice: string; stock: number; maxStock: number; sold: number;
};
export type BestItem = {
  id: string; title: string; subtitle: string; emoji?: string; image?: string;
  price: string; discountPrice: string; stock: number; maxStock: number; sold: number;
};
export type AiItem = BestItem & { id: string };
export type GameItem = {
  name: string; sub: string; code: string; emoji?: string; image?: string;
  price: string; discountPrice: string; stock: number; maxStock: number; sold: number;
};
export type PersistShape = { flash: FlashItem[]; best: BestItem[]; ai: AiItem[]; games: GameItem[] };

/* ===== Default Data (boleh ganti) ===== */
export const flashItemsDefault: FlashItem[] = [
  { id: 1, title: "1 Bulan (Garansi)", tag: "Netflix Premium", emoji: "🌀", image: "", price:"Rp 50.000", discountPrice:"Rp 30.000", stock:12, maxStock:50, sold:38 },
  { id: 2, title: "1 Bulan (Garansi)", tag: "Spotify Premium", emoji: "⛓️", image: "", price:"Rp 30.000", discountPrice:"Rp 15.000", stock:7, maxStock:30, sold:23 },
];
export const bestSellersDefault: BestItem[] = [
  { id:"capcut", title:"Capcut Pro", subtitle:"Editor", emoji:"✂️", image:"", price:"Rp 20.000", discountPrice:"Rp 10.000", stock:20, maxStock:50, sold:30 },
  { id:"config internet", title:"Config Internet", subtitle:"Internet", emoji:"🚀", image:"", price:"Rp 20.000", discountPrice:"Rp 10.000", stock:15, maxStock:40, sold:25 },
  { id:"nordvpn", title:"NordVPN", subtitle:"1 Tahun", emoji:"🛡️", image:"", price:"Rp 80.000", discountPrice:"Rp 50.000", stock:12, maxStock:30, sold:18 },
  { id:"expressvpn", title:"ExpressVPN", subtitle:"1 Bulan", emoji:"🔒", image:"", price:"Rp 90.000", discountPrice:"Rp 45.000", stock:10, maxStock:25, sold:15 },
  { id:"canva", title:"Canva Pro", subtitle:"Design Tools", emoji:"🎨", image:"", price:"Rp 20.000", discountPrice:"Rp 10.000", stock:12, maxStock:30, sold:18 },
];
export const aiToolsDefault: AiItem[] = [
  { id:"blackboxai", title:"Blackbox AI", subtitle:"Coding Tools", emoji:"🥷", image:"", price:"Rp 60.000", discountPrice:"Rp 30.000", stock:12, maxStock:30, sold:18 },
  { id:"chatgpt", title:"ChatGPT", subtitle:"AI Tools", emoji:"🧠", image:"", price:"Rp 60.000 / bulan", discountPrice:"Rp 40.000 / bulan", stock:30, maxStock:100, sold:70 },
  { id:"gemini", title:"Gemini", subtitle:"AI Tools", emoji:"✨", image:"", price:"Rp 100.000 / bulan", discountPrice:"Rp 20.000 / bulan", stock:25, maxStock:80, sold:55 },
  { id:"suno", title:"Suno AI", subtitle:"Music AI", emoji:"🎶", image:"", price:"Rp 250.000 / bulan", discountPrice:"Rp 200.000 / bulan", stock:18, maxStock:60, sold:42 },
  { id:"klingai", title:"Kling AI", subtitle:"Video AI", emoji:"🎥", image:"", price:"Rp 100.000 / bulan", discountPrice:"Rp 70.000 / bulan", stock:15, maxStock:40, sold:25 },
  { id:"pixverse", title:"Pixverse", subtitle:"Image/Video AI", emoji:"🖼️", image:"", price:"Rp 120.000 / bulan", discountPrice:"Rp 80.000 / bulan", stock:10, maxStock:25, sold:15 },
];
export const gamesDefault: GameItem[] = [
  {name:"Mobile Legends", sub:"Bang Bang", code:"ML", emoji:"🛡️", image:"", price:"Rp 40.000", discountPrice:"Rp 20.000", stock:50, maxStock:200, sold:150},
  {name:"FREE FIRE", sub:"Garena", code:"FF", emoji:"🔥", image:"", price:"Rp 50.000", discountPrice:"Rp 25.000", stock:40, maxStock:150, sold:110},
  {name:"PUBG Mobile", sub:"PUBG Corp", code:"PUBG", emoji:"🎯", image:"", price:"Rp 60.000", discountPrice:"Rp 30.000", stock:35, maxStock:100, sold:65},
  {name:"Genshin Impact", sub:"HoYoverse", code:"GI", emoji:"🌬️", image:"", price:"Rp 100.000", discountPrice:"Rp 50.000", stock:12, maxStock:50, sold:38},
  {name:"VALORANT", sub:"Riot Games", code:"VAL", emoji:"🎯", image:"", price:"Rp 90.000", discountPrice:"Rp 45.000", stock:15, maxStock:60, sold:45},
  {name:"MARVEL", sub:"NetEase", code:"MARV", emoji:"🦸", image:"", price:"Rp 80.000", discountPrice:"Rp 40.000", stock:20, maxStock:70, sold:50},
  {name:"Ragnarok M", sub:"Gravity", code:"RO", emoji:"⚔️", image:"", price:"Rp 70.000", discountPrice:"Rp 35.000", stock:10, maxStock:40, sold:30},
  {name:"Point Blank", sub:"Zepetto", code:"PB", emoji:"🔫", image:"", price:"Rp 60.000", discountPrice:"Rp 30.000", stock:8, maxStock:30, sold:22},
  {name:"Call of Duty", sub:"Mobile", code:"CODM", emoji:"☢️", image:"", price:"Rp 80.000", discountPrice:"Rp 40.000", stock:9, maxStock:30, sold:21},
  {name:"Roblox", sub:"Roblox Corp.", code:"RBX", emoji:"🧱", image:"", price:"Rp 30.000", discountPrice:"Rp 15.000", stock:25, maxStock:100, sold:75},
];

const defaults: PersistShape = { flash: flashItemsDefault, best: bestSellersDefault, ai: aiToolsDefault, games: gamesDefault };

/* ===== Helpers ===== */
function mergeByIndex<T>(base: T[], saved?: T[]): T[] {
  if (!saved || !Array.isArray(saved)) return base;
  return base.map((item, i) => ({ ...(item as any), ...(saved[i] ?? {}) }));
}

export function loadConfig(): PersistShape {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<PersistShape>;
    return {
      flash: mergeByIndex(flashItemsDefault, parsed.flash),
      best: mergeByIndex(bestSellersDefault, parsed.best),
      ai: mergeByIndex(aiToolsDefault, parsed.ai),
      games: mergeByIndex(gamesDefault, parsed.games),
    };
  } catch { return defaults; }
}

export function saveConfig(cfg: PersistShape) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

export function resetConfig() {
  saveConfig(defaults);
  return defaults;
}
