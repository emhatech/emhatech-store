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

// Testimoni
const testimonials = [
  {
    id: 1,
    name: "Andi",
    avatar: "https://i.pravatar.cc/100?img=1",
    text: "Top Up cepet banget! Gak nyampe 1 menit langsung masuk 💯",
    rating: 5,
  },
  {
    id: 2,
    name: "Siti",
    avatar: "https://i.pravatar.cc/100?img=2",
    text: "Harga murah, pelayanan ramah. Bakal langganan terus 😍",
    rating: 5,
  },
  {
    id: 3,
    name: "Budi",
    avatar: "https://i.pravatar.cc/100?img=3",
    text: "Emhatech emang the best, gak pernah kecewa 🎮🔥",
    rating: 5,
  },
  {
    id: 4,
    name: "Rina",
    avatar: "https://i.pravatar.cc/100?img=4",
    text: "Pelayanan cepat, admin fast respon. Puas banget 👍",
    rating: 5,
  },
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
    }, 4000); // auto slide tiap 4 detik
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

      {/* Indicator */}
      <div className="flex justify-center mt-3 gap-2">
        {testimonials.map((_,i)=>(
          <span 
            key={i} 
            className={`w-3 h-3 rounded-full ${i===index ? "bg-indigo-500" : "bg-gray-600"}`}
          ></span>
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
      <img 
        src={banners[index].src} 
        alt={banners[index].alt} 
        className="absolute inset-0 w-full h-full object-cover"
      />
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

        {/* 🎶 Tombol musik transparan */}
        <div className="mt-4">
          <button 
            onClick={toggleMusic} 
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center gap-2 text-sm backdrop-blur-md"
          >
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

        {/* Testimoni */}
        <section>
          <h3 className="text-lg font-semibold mb-3">💬 Testimoni Pelanggan</h3>
          <TestimonialSlider/>
        </section>
      </main>

      {/* Floating WA button */}
      <button onClick={() => openWhatsApp("Customer Support", "Gratis Konsultasi")} className="fixed bottom-4 right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
        <MessageCircle className="text-white"/>
      </button>
    </div>
  );
}
