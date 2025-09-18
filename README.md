# emhatech-store

Landing page untuk top up games & AI tools — langsung direct ke WhatsApp.

### 🚀 Jalankan secara lokal
```bash
npm install
npm run dev
# buka http://localhost:3000
```

### ☁️ Deploy ke Vercel
1. Push repo ini ke GitHub.
2. Di vercel.com → New Project → pilih repo → Deploy.

Nomor WhatsApp di-hardcode di `app/page.tsx` pada konstanta `WA_NUMBER`:
```ts
const WA_NUMBER = "6285711087751"; // ganti kalau perlu
```

Tailwind sudah ter-setup di `app/globals.css` dan `tailwind.config.ts`.
