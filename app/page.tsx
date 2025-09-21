"use client";

import { useEffect, useMemo, useState } from "react";
import { Zap, Star, MessageCircle, CreditCard, Play, Pause } from "lucide-react";

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

// Banner Images
const banners = [
  { src: "/banner1.jpg", alt: "Banner 1" },
  { src: "/banner2.jpg", alt: "Banner 2" },
  { src: "/banner3.jpg", alt: "Banner 3" },
];

// Flash Sale
const flashItems = [
  { id: 1, title: "1 Bulan (Garansi)", tag: "Netflix Premium", icon:"🌀", price:"Rp 100.000", discountPrice:"Rp 50.000", stock: 12, maxStock: 50, sold: 38 },
  { id: 2, title: "SemiPrivate Aldevice (anti limit)", tag: "Spotify Premium", icon:"⛓️", price:"Rp 30.000", discountPrice:"Rp 15.000", stock: 7, maxStock: 30, sold: 23 },
];

// Best Seller
const bestSellers = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", emoji:"✂️", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 20, maxStock: 50, sold: 30 },
  { id: "config internet", title: "Config Internet", subtitle: "Internet", emoji:"🚀", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 15, maxStock: 40, sold: 25 },
  { id: "gdrive", title: "GOOGLE DRIVE EDITING PACK", subtitle: "Selamanya", emoji:"📦", price:"Rp 120.000", discountPrice:"Rp 75.000", stock: 10, maxStock: 25, sold: 15 },
  { id: "bot", title: "Source Code Bot", subtitle: "Penjualan otomatis", emoji:"🤖", price:"Rp 150.000", discountPrice:"Rp 100.000", stock: 5, maxStock: 15, sold: 10 },
  { id: "canva", title: "Canva Pro", subtitle: "Design Tools", emoji:"🎨", price:"Rp 30.000", discountPrice:"Rp 10.000", stock: 12, maxStock: 30, sold: 18 },
];

// AI Tools
const aiTools = [
  { id: "blackboxai", title: "Blackboxai", subtitle: "Coding Tools", emoji:"🥷", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 12, maxStock: 30, sold: 18 },
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", emoji:"🧠", price:"Rp 60.000 / bulan", discountPrice:"Rp 40.000 / bulan", stock: 30, maxStock: 100, sold: 70 },
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

// Testimoni (Nama Indonesia)
const testimonials = [
  { id: 1, name: "Ahmad Fauzi", avatar: "https://i.pravatar.cc/100?img=12", text: "Top Up Mobile Legends langsung masuk dalam hitungan detik! Mantap banget 👌", rating: 5 },
  { id: 2, name: "Siti Aisyah", avatar: "https://i.pravatar.cc/100?img=32", text: "Pelayanan ramah, harga jauh lebih murah dibanding tempat lain 😍", rating: 5 },
  { id: 3, name: "Budi Santoso", avatar: "https://i.pravatar.cc/100?img=47", text: "Gak nyangka bisa secepat ini, recommended banget buat top up 🎮🔥", rating: 5 },
  { id: 4, name: "Rina Kartika", avatar: "https://i.pravatar.cc/100?img=56", text: "Langganan tiap bulan, gak pernah kecewa sama Emhatech 💯", rating: 5 },
  { id: 5, name: "Dewi Lestari", avatar: "https://i.pravatar.cc/100?img=65", text: "Proses gampang, bayar pake QRIS langsung beres. Puas banget!", rating: 5 },
];

function TestimonialCard({name, avatar, text, rating}:{name:string, avatar:string, text:string, rating:number}){
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 shadow-md flex flex-col items-center text-center w-72 mx-auto">
      <img src={avatar} alt={name} className="w-14 h-14 rounded-full mb-3"/>
      <h4 className="font-semibold">{name}</h4>
      <div className="flex mb-2">
        {Array.from({length:rating}).map((_,i)=>
          <span key={i} className="text-yellow-400">★</span>
        )}
      </div>
      <p className="text-sm text-gray-300">"{text}"</p>
    </div>
  );
}

function TestimonialSlider(){
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{transform: `translateX(-${index * 100}%)`}}
      >
        {testimonials.map(t => (
          <div key={t.id} className="flex-shrink-0 w-full flex justify-center">
            <TestimonialCard {...t}/>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3 gap-2">
        {testimonials.map((_,i)=>(
          <span key={i} className={`w-3 h-3 rounded-full ${i===index ? "bg-indigo-500" : "bg-gray-600"}`}></span>
        ))}
      </div>
    </div>
  );
}

// Countdown
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

// Reusable Components
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
    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{off}%</div>
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

// Banner
function Banner(){
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bgMusic = new Audio("/bg-music.mp3");
      bgMusic.loop = true;
      setAudio(bgMusic);
      return () => { bgMusic.pause(); };
    }
  }, []);

  const toggleMusic = () => {
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play(); }
    setPlaying(!playing);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 h-64">
      <img src={banners[index].src} alt={banners[index].alt} className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6">
        <h2 className="text-xl font-bold text-white mb-2">
          Tempat Top Up Games Termurah! <br/> 
          <span className="text-2xl">emhatech games</span>
        </h2>
        <ul className="text-white/80 space-y-1 text-sm">
          <li className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> QRIS All Payment</li>
          <li className="flex items-center gap-2"><Zap className="w-4 h-4"/> Akses cepat & mudah</li>
          <li className="flex items-center gap-2"><Star className="w-4 h-4"/> Dipercaya ribuan gamers</li>
        </ul>
        <div className="mt-4">
          <button onClick={toggleMusic} className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center gap-2 text-sm backdrop-blur-md">
            {playing ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
            {playing ? "Pause Musik" : "Putar Musik"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
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

   
