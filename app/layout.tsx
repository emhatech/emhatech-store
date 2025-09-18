import "./globals.css"; // WAJIB untuk aktifkan Tailwind

export const metadata = {
  title: "emhatech",
  description: "Top up games & AI tools termurah — emhatech",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0a0a0f] text-zinc-200">
        {children}
      </body>
    </html>
  );
}
