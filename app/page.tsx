"use client";

import { useEffect, useState } from "react";
import { Zap, Star, MessageCircle, CreditCard, Play, Pause, Sun, Moon } from "lucide-react";

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
  { id: 1, title: "1 Bulan (Garansi)", tag: "Netflix Premium", image:"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", price:"Rp 50.000", discountPrice:"Rp 30.000", stock: 12, maxStock: 50, sold: 38 },
  { id: 2, title: "1 Bulan (Garansi)", tag: "Spotify Premium", image:"https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", price:"Rp 30.000", discountPrice:"Rp 15.000", stock: 7, maxStock: 30, sold: 23 },
  { id: 3, title: "1 Bulan (Garansi)", tag: "Live Streaming YT 24 Jam", image:"https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png", price:"Rp 50.000", discountPrice:"Rp 35.000", stock: 7, maxStock: 30, sold: 23 },
  { id: 4, title: "1 USD (20k)", tag: "Paypal", image:"https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", price:"Rp 100.000", discountPrice:"Rp 50.000", stock: 7, maxStock: 30, sold: 23 },
];

// Best Seller
const bestSellers = [
  { id: "capcut", title: "Capcut Pro", subtitle: "Editor", image:"https://seeklogo.com/images/C/capcut-logo-6B5D11A4D4-seeklogo.com.png", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 20, maxStock: 50, sold: 30 },
  { id: "config internet", title: "Config Internet", subtitle: "Internet", image:"https://cdn-icons-png.flaticon.com/512/633/633816.png", price:"Rp 20.000", discountPrice:"Rp 10.000", stock: 15, maxStock: 40, sold: 25 },
  { id: "nordvpn", title: "NordVPN", subtitle: "1 Tahun", image:"https://upload.wikimedia.org/wikipedia/commons/0/0d/NordVPN_logo.png", price:"Rp 80.000", discountPrice:"Rp 50.000", stock: 12, maxStock: 30, sold: 18 },
  { id: "expressvpn", title: "ExpressVPN", subtitle: "1 Bulan", image:"https://seeklogo.com/images/E/expressvpn-logo-3C6A38AE3A-seeklogo.com.png", price:"Rp 20.000", discountPrice:"Rp 15.000", stock: 10, maxStock: 25, sold: 15 },
  { id: "canva", title: "Canva Pro", subtitle: "Design Tools", image:"https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg", price:"Rp 10.000", discountPrice:"Rp 5.000", stock: 12, maxStock: 30, sold: 18 },
];

// AI Tools
const aiTools = [
  { id: "blackboxai", title: "Blackbox AI", subtitle: "Coding Tools", image:"https://blackbox.ai/favicon.ico", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 12, maxStock: 30, sold: 18 },
  { id: "chatgpt", title: "ChatGPT", subtitle: "AI Tools", image:"https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", price:"Rp 50.000 / bulan", discountPrice:"Rp 30.000 / bulan", stock: 30, maxStock: 100, sold: 70 },
  { id: "gemini", title: "Gemini", subtitle: "AI Tools", image:"https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Bard_logo.svg", price:"Rp 100.000 / tahun", discountPrice:"Rp 50.000 / tahun", stock: 25, maxStock: 80, sold: 55 },
  { id: "suno", title: "Suno AI", subtitle: "Music AI", image:"https://suno.com/favicon.ico", price:"Rp 250.000 / bulan", discountPrice:"Rp 200.000 / bulan", stock: 18, maxStock: 60, sold: 42 },
  { id: "klingai", title: "Kling AI", subtitle: "Video AI", image:"https://cdn-icons-png.flaticon.com/512/711/711284.png", price:"Rp 10.000 / hari", discountPrice:"Rp 5.000 / hari", stock: 15, maxStock: 40, sold: 25 },
  { id: "elevelab", title: "Elevelab", subtitle: "Voice AI", image:"https://cdn-icons-png.flaticon.com/512/3991/3991278.png", price:"Rp 10.000 / hari", discountPrice:"Rp 5.000 / hari", stock: 15, maxStock: 40, sold: 25 },
  { id: "pixverse", title: "Pixverse", subtitle: "Image/Video AI", image:"https://cdn-icons-png.flaticon.com/512/1829/1829586.png", price:"Rp 150.000 / bulan", discountPrice:"Rp 120.000 / bulan", stock: 10, maxStock: 25, sold: 15 },
];

// Games
const games = [
  {name:"Mobile Legends", sub:"Bang Bang", code:"ML", image:"https://upload.wikimedia.org/wikipedia/en/6/64/MobileLegends.png", price:"Rp 40.000", discountPrice:"Rp 20.000", stock: 50, maxStock: 200, sold: 150},
  {name:"FREE FIRE", sub:"Garena", code:"FF", image:"https://upload.wikimedia.org/wikipedia/en/0/0e/Free_Fire_logo.png", price:"Rp 50.000", discountPrice:"Rp 25.000", stock: 40, maxStock: 150, sold: 110},
  {name:"PUBG Mobile", sub:"PUBG Corp", code:"PUBG", image:"https://upload.wikimedia.org/wikipedia/commons/2/26/PUBG_Corporation_logo.png", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 35, maxStock: 100, sold: 65},
  {name:"Genshin Impact", sub:"HoYoverse", code:"GI", image:"https://upload.wikimedia.org/wikipedia/commons/7/73/Genshin_Impact_logo.svg", price:"Rp 100.000", discountPrice:"Rp 50.000", stock: 12, maxStock: 50, sold: 38},
  {name:"VALORANT", sub:"Riot Games", code:"VAL", image:"https://upload.wikimedia.org/wikipedia/en/5/59/Valorant_logo_-_pink_color_version.svg", price:"Rp 90.000", discountPrice:"Rp 45.000", stock: 15, maxStock: 60, sold: 45},
  {name:"MARVEL", sub:"NetEase", code:"MARV", image:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg", price:"Rp 80.000", discountPrice:"Rp 40.000", stock: 20, maxStock: 70, sold: 50},
  {name:"Ragnarok M", sub:"Gravity", code:"RO", image:"https://upload.wikimedia.org/wikipedia/en/0/07/Ragnarok_M_Eternal_Love_logo.png", price:"Rp 70.000", discountPrice:"Rp 35.000", stock: 10, maxStock: 40, sold: 30},
  {name:"Point Blank", sub:"Zepetto", code:"PB", image:"https://upload.wikimedia.org/wikipedia/en/5/57/Point_Blank_Logo.png", price:"Rp 60.000", discountPrice:"Rp 30.000", stock: 8, maxStock: 30, sold: 22},
  {name:"Call of Duty", sub:"Mobile", code:"CODM", image:"https://upload.wikimedia.org/wikipedia/commons/4/4d/Call_of_Duty_Mobile_logo.png", price:"Rp 80.000", discountPrice:"Rp 40.000", stock: 9, maxStock: 30, sold: 21},
  {name:"Roblox", sub:"Roblox Corp.", code:"RBX", image:"https://upload.wikimedia.org/wikipedia/commons/0/09/Roblox_Logo_2022.png", price:"Rp 30.000", discountPrice:"Rp 15.000", stock: 25, maxStock: 100, sold: 75},
];

// Card components
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
  return <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{off}%</div>;
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

// Banner Slideshow
const banners = [
  { src: "/banner1.jpg", alt: "Banner 1" },
  { src: "/banner2.jpg", alt: "Banner 2" },
  { src: "/banner3.jpg", alt: "Banner 3" },
];

function Banner({ toggleMusic, playing }: { toggleMusic: () => void; playing: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
      <img src={banners[index].src} alt={banners[index].alt} className="w-full h-48 object-cover transition-all duration-700"/>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6">
        {/* Running Text dengan gradien */}
        <div className="overflow-hidden whitespace-nowrap mb-2">
          <h2 className="inline-block text-xl font-bold animate-marquee bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
            Tempat Top Up Games Termurah! — emhatech games — Tempat Top Up Games Termurah! — emhatech games —
          </h2>
        </div>

        <ul className="text-white/80 space-y-1 text-sm">
          <li className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> QRIS All Payment</li>
          <li className="flex items-center gap-2"><Zap className="w-4 h-4"/> Akses cepat & mudah</li>
          <li className="flex items-center gap-2"><Star className="w-4 h-4"/> Dipercaya ribuan gamers</li>
        </ul>
        <button onClick={toggleMusic} className="mt-3 px-3 py-1.5 bg-indigo-600 text-white rounded-lg flex items-center gap-2 text-sm">
          {playing ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
          {playing ? "Pause Musik" : "Putar Musik"}
        </button>
      </div>
    </div>
  );
}

export default function EmhaTechStyle(){
  const [darkMode, setDarkMode] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const bgMusic = new Audio("/bg-music.mp3");
    bgMusic.loop = true;
    setAudio(bgMusic);
    return () => { bgMusic.pause(); };
  }, []);

  const toggleMusic = () => {
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  return (
    <div className={darkMode ? "min-h-screen bg-[#0a0a0f] text-zinc-200" : "min-h-screen bg-white text-black"}>
      {/* 🔘 Dark/Light Toggle Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-md"
      >
        {darkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
      </button>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <Banner toggleMusic={toggleMusic} playing={playing} />

        {/* Flash Sale */}
        <section>
          <h3 className="text-lg font-semibold mb-3">🔥 Flash Sale</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {flashItems.map(item=>(
              <Card key={item.id}>
                <DiscountBadge price={item.price} discountPrice={item.discountPrice}/>
                <div className="flex gap-3 items-center">
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-contain bg-white p-1"/>
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
                  <img src={b.image} alt={b.title} className="w-14 h-14 rounded-lg object-contain bg-white p-1"/>
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

        {/* AI
  
