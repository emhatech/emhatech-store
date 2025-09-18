
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ChevronRight, Clock, Zap, Shield, Star, ShoppingCart, MessageCircle, Menu, LogIn, UserPlus, Gamepad2, CreditCard, Smartphone, Gift, Headphones, Cpu, Link as LinkIcon } from "lucide-react";

function classNames(...s: (string | false | undefined)[]) { return s.filter(Boolean).join(" "); }
const WA_NUMBER = "6285711087751";

function openWhatsApp(product: string){
  const message = `Halo saya mau beli *${product}* untuk paket 1 bulan. Mohon info lebih lanjut.`;
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

const flashItems = [
  { id: 1, title: "1 Tahun Sharing (Garansi Tahun)", tag: "Netflix Premium", badge:"TERMURAH", ribbon:"-70%", icon:"🌀" },
  { id: 2, title: "SemiPrivate Aldevice (anti limit)", tag: "Netflix Premium", badge:"TERMURAH", ribbon:"-55%", icon:"⛓️" },
];

const bestSellers = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", emoji:"✂️" },
  { id: "wdp", title: "WDP FAST", subtitle: "Monoton", emoji:"🚀" },
  { id: "gdrive", title: "GOOGLE DRIVE EDITING PACK", subtitle: "Beli + Akses Selamanya", emoji:"📦" },
  { id: "bot", title: "Source Code Bot", subtitle: "Untuk penjualan otomatis", emoji:"🤖" },
];

const aiTools = [
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", emoji:"🧠" },
  { id: "gemini", title: "Gemini", subtitle: "AI Tools", emoji:"✨" },
  { id: "suno", title: "Suno AI", subtitle: "Music AI", emoji:"🎶" },
];

const categories = [
  {label:"App Premium", icon:<Cpu className="w-4 h-4"/>},
  {label:"Games", icon:<Gamepad2 className="w-4 h-4"/>},
  {label:"Produk Kirim", icon:<Gift className="w-4 h-4"/>},
  {label:"E-Wallet", icon:<CreditCard className="w-4 h-4"/>},
  {label:"Pulsa Reguler", icon:<Smartphone className="w-4 h-4"/>},
  {label:"Paket Data", icon:<Smartphone className="w-4 h-4"/>},
  {label:"Layanan Hosting", icon:<LinkIcon className="w-4 h-4"/>},
  {label:"Voucher", icon:<Gift className="w-4 h-4"/>},
  {label:"Gadget Service", icon:<Headphones className="w-4 h-4"/>},
  {label:"Sertif Scanner", icon:<Shield className="w-4 h-4"/>},
  {label:"Metode Lain", icon:<Zap className="w-4 h-4"/>},
  {label:"Transfer Bank", icon:<CreditCard className="w-4 h-4"/>},
];

const games = [
  {name:"Mobile Legends", sub:"Bang Bang", code:"ML", thumb:"🛡️"},
  {name:"FREE FIRE", sub:"Garena", code:"FF", thumb:"🔥"},
  {name:"PUBG Mobile", sub:"pubg", code:"PUBG", thumb:"🎯"},
  {name:"Genshin Impact", sub:"HoYoverse", code:"GI", thumb:"🌬️"},
  {name:"VALORANT", sub:"Riot Games", code:"VAL", thumb:"🎯"},
  {name:"MARVEL", sub:"NetEase", code:"MARV", thumb:"🦸"},
  {name:"Ragnarok M", sub:"Gravity", code:"RO", thumb:"⚔️"},
  {name:"Point Blank", sub:"Zepetto", code:"PB", thumb:"🔫"},
  {name:"Call of Duty", sub:"Mobile", code:"CODM", thumb:"☢️"},
  {name:"Roblox", sub:"Roblox Corp.", code:"RBX", thumb:"🧱"},
];

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

function Card({children}:{children: React.ReactNode}){
  return <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">{children}</div>
}

function Banner(){
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]"/>
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-10">
        <div className="flex-1 text-white">
          <div className="inline-flex items-center gap-2 bg-black/30 rounded-full px-3 py-1 text-xs mb-3 border border-white/10">
            <Shield className="w-3 h-3"/> <span>Spesialis produk games TERMURAH</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight">Tempat Top Up Games Termurah!<br/> <span className="font-black">emhatech games</span></h2>
          <ul className="mt-4 space-y-1 text-sm text-indigo-100/90">
            <li className="flex items-center gap-2"><CreditCard className="w-4 h-4"/>Metode pembayaran QRIS All Payment</li>
            <li className="flex items-center gap-2"><Zap className="w-4 h-4"/>Akses disimpan dan mudah</li>
            <li className="flex items-center gap-2"><Star className="w-4 h-4"/>Sudah dipercaya ribuan gamers</li>
          </ul>
          <button onClick={() => openWhatsApp("EmhaTech Games")} className="mt-6 inline-flex items-center gap-2 bg-white text-zinc-900 px-4 py-2 rounded-xl font-medium hover:-translate-y-px active:translate-y-0 transition">
            KUNJUNGI <ChevronRight className="w-4 h-4"/>
          </button>
        </div>
        <div className="flex-1 w-full">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="grid grid-cols-5 gap-2 text-center text-xs text-white/90">
              {Array.from({length:10}).map((_,i)=>(
                <div key={i} className="aspect-square rounded-lg bg-white/10 flex items-center justify-center">🎮</div>
              ))}
            </div>
            <p className="text-[10px] text-white/60 mt-2">Akses disimpan dengan Mudah</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmhaTechStyle(){
  const {h,m,s} = useCountdown(13.566);
  const [mobileNav,setMobileNav]=useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-14 flex items-center gap-3">
            <button className="md:hidden p-2" onClick={()=>setMobileNav(v=>!v)}><Menu className="w-5 h-5"/></button>
            <div className="flex items-center gap-2 font-bold">
              <div className="w-6 h-6 rounded bg-indigo-600 grid place-items-center">⚡</div>
              <span>emhatech</span>
            </div>
            <nav className="hidden md:flex ml-6 gap-4 text-sm">
              {['Beranda','Cari Pesanan','Daftar Layanan','Hubungi Kami','API Docs','Kebijakan Privasi','Syarat & Ketentuan'].map(i=>(
                <a key={i} href="#" className="hover:text-white/90 text-white/70">{i}</a>
              ))}
            </nav>
            <div className="relative ml-auto w-40 md:w-72">
              <input className="w-full bg-zinc-900/70 border border-zinc-800 rounded-xl h-9 pl-9 pr-3 text-sm outline-none focus:border-indigo-500" placeholder="Cari Games"/>
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"/>
            </div>
            <div className="hidden md:flex items-center gap-2 ml-2">
              <button className="px-3 h-9 rounded-xl border border-zinc-700 text-sm flex items-center gap-2 hover:border-zinc-600"><LogIn className="w-4 h-4"/>Masuk</button>
              <button className="px-3 h-9 rounded-xl bg-indigo-600 text-sm flex items-center gap-2 hover:brightness-110"><UserPlus className="w-4 h-4"/>Daftar</button>
            </div>
          </div>
          {mobileNav && (
            <div className="md:hidden pb-3 grid gap-2 text-sm">
              {['Beranda','Cari Pesanan','Daftar Layanan','Hubungi Kami','API Docs','Kebijakan Privasi','Syarat & Ketentuan'].map(i=>(
                <a key={i} href="#" className="px-2 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800">{i}</a>
              ))}
              <div className="flex gap-2">
                <button className="flex-1 px-3 h-9 rounded-xl border border-zinc-700 text-sm">Masuk</button>
                <button className="flex-1 px-3 h-9 rounded-xl bg-indigo-600 text-sm">Daftar</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <Banner/>

        <section className="bg-zinc-950/60 border border-zinc-800 rounded-2xl">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <span className="bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded-md text-xs inline-flex items-center gap-2"><Zap className="w-4 h-4"/>FLASH SALE</span>
            <div className="flex items-center gap-1 text-xs text-white/80"><Clock className="w-3 h-3"/> <span className="font-mono">{String(h).padStart(2,'0')}</span> : <span className="font-mono">{String(m).padStart(2,'0')}</span> : <span className="font-mono">{String(s).padStart(2,'0')}</span></div>
          </div>
          <div className="p-4 grid md:grid-cols-2 gap-4">
            {flashItems.map(item=>(
              <div key={item.id} className="relative border border-zinc-800 rounded-xl overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-zinc-900">
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded">{item.ribbon}</div>
                <div className="p-4 flex items-center gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-[11px] text-white/60">{item.tag}</div>
                    <div className="mt-2 inline-flex items-center gap-2 text-[10px] text-emerald-300 bg-emerald-600/10 px-2 py-1 rounded">{item.badge}</div>
                  </div>
                  <button onClick={() => openWhatsApp(item.title)} className="px-3 py-2 rounded-lg bg-indigo-600 text-sm hover:brightness-110 flex items-center gap-2">Beli <ShoppingCart className="w-4 h-4"/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Produk Best Seller</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map(b=>(
              <Card key={b.id}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 grid place-items-center text-2xl">{b.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">{b.title}</div>
                    <div className="text-[11px] text-white/60">{b.subtitle}</div>
                  </div>
                  <button onClick={() => openWhatsApp(b.title)} className="mt-2 w-full h-9 rounded-lg bg-indigo-600 text-sm">Beli</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">AI Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {aiTools.map(a=>(
              <Card key={a.id}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 grid place-items-center text-2xl">{a.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="text-[11px] text-white/60">{a.subtitle}</div>
                  </div>
                  <button onClick={() => openWhatsApp(a.title)} className="mt-2 w-full h-9 rounded-lg bg-indigo-600 text-sm">Langganan</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Games</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {games.map(g=>(
              <div key={g.code} className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-indigo-600 transition">
                <div className="aspect-[4/3] grid place-items-center text-5xl">{g.thumb}</div>
                <div className="px-3 pb-3">
                  <div className="text-sm font-semibold">{g.name}</div>
                  <div className="text-[11px] text-white/50">{g.sub}</div>
                  <button onClick={() => openWhatsApp(g.name)} className="mt-2 w-full h-9 rounded-lg bg-indigo-600 transition text-sm">Top Up</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-10 text-sm text-white/60">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 font-bold text-white"><div className="w-6 h-6 rounded bg-indigo-600 grid place-items-center">⚡</div> emhatech</div>
            <p className="mt-2">Termurah sejak 2020. Semua brand & logo adalah milik masing-masing pemilik.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Link Cepat</div>
            <ul className="space-y-1">
              {['Daftar Layanan','Hubungi Kami','Kebijakan Privasi','Syarat & Ketentuan'].map(l=> <li key={l}><a href="#" className="hover:text-white">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Bantuan</div>
            <p>Jam Operasional: 09:00 - 22:00 WIB</p>
          </div>
        </div>
      </footer>

      <button onClick={() => openWhatsApp('Customer Support')} className="fixed bottom-4 right-4 rounded-full h-12 w-12 bg-indigo-600 grid place-items-center shadow-2xl hover:brightness-110">
        <MessageCircle className="w-5 h-5 text-white"/>
      </button>
    </div>
  );
}
