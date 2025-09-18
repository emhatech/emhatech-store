export const metadata = {
  title: "emhatech",
  description: "Top up games & AI tools termurah — emhatech",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
