"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Clock, Zap, Shield, Star, ShoppingCart, MessageCircle, CreditCard } from "lucide-react";

const WA_NUMBER = "6285711087751";
function openWhatsApp(product: string, price: string){
  const message = `Halo EMHATECH saya mau beli *${product}* seharga ${price}. Mohon info lebih lanjut.`;
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

// Flash Sale
const flashItems = [
  { id: 1, title: "1 Tahun Sharing (Garansi Tahun)", tag: "Netflix Premium", icon:"🌀", price:"Rp 500.000", discountPrice:"Rp 150.000", stock: 12, maxStock: 50, sold: 38 },
  { id: 2, title: "SemiPrivate Aldevice (anti limit)", tag: "Netflix Premium", icon:"⛓️", price:"Rp 250.000", discountPrice:"Rp 100.000", stock: 7, maxStock: 30, sold: 23 },
];

// Best Seller
const bestSellers = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", emoji:"✂️", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 20, maxStock: 50, sold: 30 },
  { id: "wdp", title: "Canva", subtitle: "Editor", emoji:"🚀", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 15, maxStock: 40, sold: 25 },
  { id: "gdrive", title: "GOOGLE DRIVE EDITING PACK", subtitle: "Selamanya", emoji:"📦", price:"Rp 120.000", discountPrice:"Rp 75.000", stock: 10, maxStock: 25, sold: 15 },
  { id: "bot", title: "Source Code Bot", subtitle: "Penjualan otomatis", emoji:"🤖", price:"Rp 150.000", discountPrice:"Rp 100.000", stock: 5, maxStock: 15, sold: 10 },
];

// AI Tools
const aiTools = [
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", emoji:"🧠", price:"Rp 50.000 / bulan", discountPrice:"Rp 30.000 / bulan", stock: 30, maxStock: 100, sold: 70 },
  { id: "gemini", title: "Gemini", subtitle: "AI Tools", emoji:"✨", price:"Rp 50.000 / bulan", discountPrice:"Rp 20.000 / bulan", stock: 25, maxStock: 80, sold: 55 },
  { id: "suno", title: "Suno AI", subtitle: "Music AI", emoji:"🎶", price:"Rp 250.000 / bulan", discountPrice:"Rp 200.000 / bulan", stock: 18, maxStock: 60, sold: 42 },
];

// Games
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

function Banner(){
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 p-6">
      <h2 className="text-3xl font-bold text-white">Tempat Top Up Games Termurah! <br/> <span className="text-4xl">emhatech games</span></h2>
      <ul className="mt-4 text-white/80 space-y-1">
        <li className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> QRIS All Payment</li>
        <li className="flex items-center gap-2"><Zap className="w-4 h-4"/> Akses cepat & mudah</li>
        <li className="flex items-center gap-2"><Star className="w-4 h-4"/> Dipercaya ribuan gamers</li>
      </ul>
      <button onClick={() => openWhatsApp("EmhaTech Games", "Promo")} className="mt-4 px-4 py-2 bg-white text-black rounded-lg">KUNJUNGI</button>
    </div>
  );
}

export default function EmhaTechStyle(){
  const {h,m,s} = useCountdown(13.566);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <Banner/>

        {/* Flash Sale */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🔥 Flash Sale</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {flashItems.map(item=>(
              <Card key={item.id}>
                <DiscountBadge price={item.price} discountPrice={item.discountPrice}/>
                <div className="flex gap-3 items-center">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.tag}</div>
                    <Price price={item.price} discountPrice={item.discountPrice}/>
                    <StockBar stock={item.stock} maxStock={item.maxStock} sold={item.sold}/>
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
            {bestSellers.map(b=>(
              <Card key={b.id}>
                <DiscountBadge price={b.price} discountPrice={b.discountPrice}/>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{b.emoji}</div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.subtitle}</div>
                  <Price price={b.price} discountPrice={b.discountPrice}/>
                  <StockBar stock={b.stock} maxStock={b.maxStock} sold={b.sold}/>
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
            {aiTools.map(a=>(
              <Card key={a.id}>
                <DiscountBadge price={a.price} discountPrice={a.discountPrice}/>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{a.emoji}</div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-xs text-gray-400">{a.subtitle}</div>
                  <Price price={a.price} discountPrice={a.discountPrice}/>
                  <StockBar stock={a.stock} maxStock={a.maxStock} sold={a.sold}/>
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
            {games.map(g=>(
              <Card key={g.code}>
                <DiscountBadge price={g.price} discountPrice={g.discountPrice}/>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl">{g.thumb}</div>
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-xs text-gray-400">{g.sub}</div>
                  <Price price={g.price} discountPrice={g.discountPrice}/>
                  <StockBar stock={g.stock} maxStock={g.maxStock} sold={g.sold}/>
                  <button onClick={() => openWhatsApp(g.name, g.discountPrice)} className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm">Top Up</button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Floating WA button */}
      <button onClick={() => openWhatsApp("Customer Support", "Gratis Konsultasi")} className="fixed bottom-4 right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
        <MessageCircle className="text-white"/>
      </button>
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
