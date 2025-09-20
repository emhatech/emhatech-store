"use client";

import { useEffect, useMemo, useState } from "react";
import { Zap, Star, MessageCircle, CreditCard } from "lucide-react";

// -------------------- KONFIGURASI --------------------
const WA_NUMBER = "6285711087751";
function openWhatsApp(product: string, price: string){
  const message = `Halo EMHATECH 👋 saya mau beli *${product}* seharga ${price}. Mohon info lebih lanjut.`;
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function calcDiscount(price: string, discount: string): number {
  const p = parseInt(price.replace(/\D/g,"")); 
  const d = parseInt(discount.replace(/\D/g,"")); 
  if (!p || !d) return 0;
  return Math.round(((p - d) / p) * 100);
}

// -------------------- DATA PRODUK --------------------
const flashItems = [
  { id: 1, title: "1 Bulan (Garansi)", tag: "Netflix Premium", icon:"🌀", price:"Rp 100.000", discountPrice:"Rp 50.000", stock: 12, maxStock: 50, sold: 38 },
  { id: 2, title: "SemiPrivate Aldevice (anti limit)", tag: "Spotify Premium", icon:"⛓️", price:"Rp 30.000", discountPrice:"Rp 15.000", stock: 7, maxStock: 30, sold: 23 },
];

const bestSellers = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", emoji:"✂️", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 20, maxStock: 50, sold: 30 },
  { id: "config internet", title: "Config Internet", subtitle: "Internet", emoji:"🚀", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 15, maxStock: 40, sold: 25 },
  { id: "gdrive", title: "GOOGLE DRIVE EDITING PACK", subtitle: "Selamanya", emoji:"📦", price:"Rp 120.000", discountPrice:"Rp 75.000", stock: 10, maxStock: 25, sold: 15 },
  { id: "bot", title: "Source Code Bot", subtitle: "Penjualan otomatis", emoji:"🤖", price:"Rp 150.000", discountPrice:"Rp 100.000", stock: 5, maxStock: 15, sold: 10 },
  { id: "canva", title: "Canva Pro", subtitle: "Design Tools", emoji:"🎨", price:"Rp 30.000", discountPrice:"Rp 10.000", stock: 12, maxStock: 30, sold: 18 },
];

const aiTools = [
  { id: "blackboxai", title: "Blackboxai", subtitle: "Design Tools", emoji:"🥷", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 12, maxStock: 30, sold: 18 },
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", emoji:"🧠", price:"Rp 60.000 / bulan", discountPrice:"Rp 40.000 / bulan", stock: 30, maxStock: 100, sold: 70 },
  { id: "gemini", title: "Gemini", subtitle: "AI Tools", emoji:"✨", price:"Rp 50.000 / bulan", discountPrice:"Rp 20.000 / bulan", stock: 25, maxStock: 80, sold: 55 },
  { id: "suno", title: "Suno AI", subtitle: "Music AI", emoji:"🎶", price:"Rp 250.000 / bulan", discountPrice:"Rp 200.000 / bulan", stock: 18, maxStock: 60, sold: 42 },
];

const games = [
  {name:"Mobile Legends", sub:"Bang Bang", code:"ML", thumb:"🛡️", price:"Rp 40.000", discountPrice:"Rp 20.000", stock: 50, maxStock: 200, sold: 150},
  {name:"FREE FIRE", sub:"Garena", code:"FF", thumb:"🔥", price:"Rp 50.000", discountPrice:"Rp 25.000", stock: 40, maxStock: 150, sold: 110},
  {name:"PUBG Mobile", sub:"PUBG Corp", code:"PUBG", thumb:"🎯", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 35, maxStock: 100, sold: 65},
  {name:"Genshin Impact", sub:"HoYoverse", code:"GI", thumb:"🌬️", price:"Rp 100.000", discountPrice:"Rp 50.000", stock: 12, maxStock: 50, sold: 38},
  {name:"VALORANT", sub:"Riot Games", code:"VAL", thumb:"🎯", price:"Rp 90.000", discountPrice:"Rp 45.000", stock: 15, maxStock: 60, sold: 45},
  {name:"MARVEL", sub:"NetEase", code:"MARV", thumb:"🦸", price:"Rp 80.000", discountPrice:"Rp 40.000", stock: 20, maxStock: 70, sold: 50},
  {name:"Ragnarok M", sub:"Gravity", code:"RO", thumb:"⚔️", price:"Rp 70.000", discountPrice:"Rp 35.000", stock: 10, maxStock: 40, sold: 30},
  {name:"Point Blank", sub:"Zepetto", code:"PB", thumb:"🔫", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 8, maxStock: 30, sold: 22},
  {name:"Call of Duty", sub:"Mobile", code:"CODM", thumb:"☢️", price:"Rp 80.000", discountPrice:"Rp 40.000", stock: 9, maxStock: 30, sold: 21},
  {name:"Roblox", sub:"Roblox Corp.", code:"RBX", thumb:"🧱", price:"Rp 30.000", discountPrice:"Rp 15.000", stock: 25, maxStock: 100, sold: 75},
];

// -------------------- HOOK --------------------
function useCountdown(hours=14){
  const start = useMemo(()=>Date.now(),[]);
  const end = useMemo(()=>start + hours*60*60*1000,[start,hours]);
  const [now,setNow]=useState(Date.now());
  useEffect(()=>{ const t=setInterval(()=>setNow(Date.now()),1000); return ()=>clearInterval(t); },[]);
  const diff = Math.max(0,end-now);
  const h = Math.floor(diff/3_600_000);
  const m = Math.floor((diff%3_600_000)/60_000);
  const s = Math.floor((diff%60_000)/1_000);
  return {h,m,s};
}

// -------------------- KOMPONEN UI --------------------
function Card({children}:{children: React.ReactNode}){
  return <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 shadow-lg">{children}</div>
}

function Price({price, discountPrice}:{price:string, discountPrice:string}){
  return (
    <div className="mt-1">
      <span className="text-sm text-red-400 line-through mr-2">{price}</span>
      <span className="text-lg font-bold text-emerald-400">{discountPrice}</span>
    </div>
  );
}

function DiscountBadge({price, discountPrice}:{price:string, discountPrice:string}){
  const off = calcDiscount(price, discountPrice);
  if (!off) return null;
  return (
    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
      -{off}%
    </div>
  );
}

function StockBar({stock, maxStock, sold}:{stock:number, maxStock:number, sold:number}){
  const percent = Math.max(0, Math.min(100, Math.round((stock / maxStock) * 100)));
  let color = "bg-green-500";
  if (percent <= 50) color = "bg-yellow-500";
  if (percent <= 20) color = "bg-red-500";

  return (
    <div className="w-full mt-2">
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`${color} h-2`} style={{width: `${percent}%`}}></div>
      </div>
      <div className="flex justify-between text-xs mt-1 text-gray-400">
        <span>Sisa {stock} / {maxStock}</span>
        <span>{sold}+ terjual</span>
      </div>
    </div>
  );
}

// -------------------- BANNER --------------------
function Banner(){
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 p-6">
      <h2 className="text-3xl font-bold text-white">
        Tempat Top Up Games Termurah! <br/> 
        <span className="text-4xl">emhatech games</span>
      </h2>
      <ul className="mt-4 text-white/80 space-y-1">
        <li className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> QRIS All Payment</li>
        <li className="flex items-center gap-2"><Zap className="w-4 h-4"/> Akses cepat & mudah</li>
        <li className="flex items-center gap-2"><Star className="w-4 h-4"/> Dipercaya ribuan gamers</li>
      </ul>
      <button onClick={() => openWhatsApp("EmhaTech Games", "Promo")} className="mt-4 px-4 py-2 bg-white text-black rounded-lg">KUNJUNGI</button>
    </div>
  );
}

// -------------------- MAIN PAGE --------------------
export default function EmhaTechStyle(){
  const {h,m,s} = useCountdown(13.566);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <Banner/>

        {/* Flash Sale */}
        {/* ... Best Seller, AI Tools, Games sama persis dengan sebelumnya ... */}
      </main>

      {/* Floating WA button */}
      <button onClick={() => openWhatsApp("Customer Support","Gratis Konsultasi")} className="fixed bottom-4 right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
        <MessageCircle className="text-white"/>
      </button>
    </div>
  );
    }
