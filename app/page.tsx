"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const WA_NUMBER = "6285711087751"; // ganti nomor WA kamu
function openWhatsApp(product: string, price: string){
  const message = `Halo saya mau beli *${product}* seharga ${price}. Mohon info lebih lanjut.`;
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

// ========== DATA PRODUK ==========
const flashItems = [
  { id: 1, title: "1 Tahun Sharing (Garansi Tahun)", tag: "Netflix Premium", icon:"🌀", price:"Rp 500.000", discountPrice:"Rp 150.000", stock: 12, maxStock: 50, sold: 38 },
  { id: 2, title: "SemiPrivate Aldevice (anti limit)", tag: "Netflix Premium", icon:"⛓️", price:"Rp 250.000", discountPrice:"Rp 100.000", stock: 7, maxStock: 30, sold: 23 },
];

const bestSellers = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", emoji:"✂️", price:"Rp 50.000", discountPrice:"Rp 25.000", stock: 20, maxStock: 50, sold: 30 },
  { id: "wdp", title: "WDP FAST", subtitle: "Monoton", emoji:"🚀", price:"Rp 80.000", discountPrice:"Rp 50.000", stock: 15, maxStock: 40, sold: 25 },
  { id: "gdrive", title: "GOOGLE DRIVE EDITING PACK", subtitle: "Selamanya", emoji:"📦", price:"Rp 120.000", discountPrice:"Rp 75.000", stock: 10, maxStock: 25, sold: 15 },
  { id: "bot", title: "Source Code Bot", subtitle: "Penjualan otomatis", emoji:"🤖", price:"Rp 150.000", discountPrice:"Rp 100.000", stock: 5, maxStock: 15, sold: 10 },
];

const aiTools = [
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", emoji:"🧠", price:"Rp 100.000 / bulan", discountPrice:"Rp 50.000 / bulan", stock: 30, maxStock: 100, sold: 70 },
  { id: "gemini", title: "Gemini", subtitle: "AI Tools", emoji:"✨", price:"Rp 120.000 / bulan", discountPrice:"Rp 60.000 / bulan", stock: 25, maxStock: 80, sold: 55 },
  { id: "suno", title: "Suno AI", subtitle: "Music AI", emoji:"🎶", price:"Rp 80.000 / bulan", discountPrice:"Rp 40.000 / bulan", stock: 18, maxStock: 60, sold: 42 },
];

// ========== KOMPONEN UI ==========
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

// ========== BANNER SLIDER ==========
function AnimatedHeader(){
  const banners = [
    { id: 1, img: "/banner1.jpg", alt: "Promo Top Up Games" },
    { id: 2, img: "/banner2.jpg", alt: "Flash Sale AI Tools" },
    { id: 3, img: "/banner3.jpg", alt: "Trusted Seller" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[180px] md:h-[280px]"
      >
        {banners.map(b => (
          <SwiperSlide key={b.id}>
            <img
              src={b.img}
              alt={b.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// ========== PAGE ==========
export default function EmhaTechStyle(){
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        
        {/* Banner Anime Slider */}
        <AnimatedHeader/>

        {/* Flash Sale */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🔥 Flash Sale</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {flashItems.map(item=>(
              <Card key={item.id}>
                <div className="flex gap-3 items-center">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.tag}</div>
                    <Price price={item.price} discountPrice={item.discountPrice}/>
                    <StockBar stock={item.stock} maxStock={item.maxStock} sold={item.sold}/>
                  </div>
                  <button 
                    onClick={() => openWhatsApp(item.title, item.discountPrice)} 
                    className="px-3 py-2 bg-indigo-600 rounded-lg text-sm">
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
            {bestSellers.map(b=>(
              <Card key={b.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{b.emoji}</div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.subtitle}</div>
                  <Price price={b.price} discountPrice={b.discountPrice}/>
                  <StockBar stock={b.stock} maxStock={b.maxStock} sold={b.sold}/>
                  <button 
                    onClick={() => openWhatsApp(b.title, b.discountPrice)} 
                    className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm">
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
            {aiTools.map(a=>(
              <Card key={a.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{a.emoji}</div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-xs text-gray-400">{a.subtitle}</div>
                  <Price price={a.price} discountPrice={a.discountPrice}/>
                  <StockBar stock={a.stock} maxStock={a.maxStock} sold={a.sold}/>
                  <button 
                    onClick={() => openWhatsApp(a.title, a.discountPrice)} 
                    className="mt-2 w-full bg-indigo-600 py-1 rounded-lg text-sm">
                    Langganan
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Floating WA button */}
      <button 
        onClick={() => openWhatsApp("Customer Support", "Gratis Konsultasi")} 
        className="fixed bottom-4 right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
        <MessageCircle className="text-white"/>
      </button>
    </div>
  );
  }
  
