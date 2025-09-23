// app/admin/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadConfig, saveConfig, resetConfig,
  type PersistShape, ADMIN_PASS,
  flashItemsDefault, bestSellersDefault, aiToolsDefault, gamesDefault,
} from "@/lib/store";

type TabKey = keyof PersistShape; // "flash" | "best" | "ai" | "games"

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [cfg, setCfg] = useState<PersistShape>(() => loadConfig());
  const [tab, setTab] = useState<TabKey>("flash");

  useEffect(() => { setCfg(loadConfig()); }, []);
  useEffect(() => { saveConfig(cfg); }, [cfg]);

  const dataList = useMemo(() => cfg[tab] as any[], [cfg, tab]);
  const placeholderByKey: Record<TabKey, any[]> = {
    flash: flashItemsDefault, best: bestSellersDefault, ai: aiToolsDefault, games: gamesDefault,
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-zinc-100">
        <div className="w-full max-w-sm bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h1 className="text-lg font-semibold mb-4">Login Admin</h1>
          <input
            type="password" value={pass} onChange={(e)=>setPass(e.target.value)}
            placeholder="Masukkan passcode"
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"
          />
          <button onClick={()=> setAuthed(pass === ADMIN_PASS)} className="mt-3 w-full px-3 py-2 rounded bg-indigo-600 text-white">Masuk</button>
          <p className="mt-3 text-xs text-zinc-400">Tip: set <code>NEXT_PUBLIC_ADMIN_PASS</code> di env.</p>
        </div>
      </div>
    );
  }

  const setField = (idx: number, key: string, val: any) => {
    setCfg(prev => {
      const next = { ...prev, [tab]: [...prev[tab]] } as PersistShape;
      (next[tab] as any)[idx] = { ...(next[tab] as any)[idx], [key]: val };
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100">
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <div className="flex gap-2">
          <button
            onClick={()=>{
              const blob = new Blob([JSON.stringify(cfg,null,2)], {type:"application/json"});
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a"); a.href = url; a.download = "emha-config.json"; a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm"
          >Export JSON</button>

          <label className="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm cursor-pointer">
            Import JSON
            <input type="file" accept="application/json" className="hidden"
              onChange={async (e)=>{
                const f = e.target.files?.[0]; if(!f) return;
                try { const parsed = JSON.parse(await f.text()); setCfg(parsed); }
                catch { alert("JSON tidak valid"); }
              }}
            />
          </label>

          <button onClick={()=>{ setCfg(resetConfig()); alert("Reset ke default."); }} className="px-3 py-1.5 rounded bg-rose-600/90 text-white text-sm">Reset</button>
          <button onClick={()=>setAuthed(false)} className="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {(["flash","best","ai","games"] as TabKey[]).map(k=>(
            <button key={k}
              className={`px-3 py-1.5 rounded border text-sm ${tab===k ? "bg-indigo-600 text-white border-indigo-600" : "bg-zinc-900/60 border-zinc-800"}`}
              onClick={()=>setTab(k)}
            >
              {k.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Editor List */}
        <div className="space-y-4">
          {dataList.map((it, idx)=>(
            <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="grid md:grid-cols-4 gap-3">
                {/* gambar */}
                <div className="col-span-1">
                  <label className="text-xs text-zinc-400">Image URL</label>
                  <input value={it.image || ""} onChange={e=>setField(idx,"image", e.target.value)}
                    placeholder="https://..."
                    className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                  <div className="mt-2 w-28 h-28 bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
                    {it.image ? <img src={it.image} alt="preview" className="w-full h-full object-cover"/> : <span className="text-3xl">{it.emoji || "🖼️"}</span>}
                  </div>
                </div>

                {/* text fields */}
                <div className="col-span-3 grid sm:grid-cols-2 gap-3">
                  {"title" in it && (
                    <div>
                      <label className="text-xs text-zinc-400">Title</label>
                      <input value={(it as any).title} onChange={e=>setField(idx,"title", e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                    </div>
                  )}
                  {"tag" in it && (
                    <div>
                      <label className="text-xs text-zinc-400">Tag / Kategori</label>
                      <input value={(it as any).tag} onChange={e=>setField(idx,"tag", e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                    </div>
                  )}
                  {"subtitle" in it && (
                    <div>
                      <label className="text-xs text-zinc-400">Subtitle</label>
                      <input value={(it as any).subtitle} onChange={e=>setField(idx,"subtitle", e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                    </div>
                  )}
                  {/* harga */}
                  <div>
                    <label className="text-xs text-zinc-400">Harga Normal</label>
                    <input value={it.price} onChange={e=>setField(idx,"price", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400">Harga Diskon</label>
                    <input value={it.discountPrice} onChange={e=>setField(idx,"discountPrice", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                  </div>
                  {/* stok */}
                  <div>
                    <label className="text-xs text-zinc-400">Stock</label>
                    <input type="number" value={it.stock} onChange={e=>setField(idx,"stock", Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400">Max Stock</label>
                    <input type="number" value={it.maxStock} onChange={e=>setField(idx,"maxStock", Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400">Sold</label>
                    <input type="number" value={it.sold} onChange={e=>setField(idx,"sold", Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700 outline-none"/>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="mt-3 flex gap-2">
                <button onClick={()=>saveConfig({ ...cfg })} className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm">Save</button>
                <button
                  onClick={()=>{
                    const base = (placeholderByKey[tab] as any[])[idx];
                    setCfg(prev=>{
                      const next = { ...prev, [tab]: [...prev[tab]] } as PersistShape;
                      (next[tab] as any)[idx] = { ...base };
                      return next;
                    });
                  }}
                  className="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-sm"
                >Reset Item</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
