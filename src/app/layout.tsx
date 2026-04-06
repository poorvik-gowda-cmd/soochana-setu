import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soochana Setu | National Intelligence Command",
  description: "One Person, Many Realities. Integrated Government Data Intelligence Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <body className="bg-black text-amber-100 min-h-screen selection:bg-amber-500/30" suppressHydrationWarning>
        {/* Global Elite Overlay (Subtle Gradient) */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03),transparent_50%)] pointer-events-none z-0" />
        <div className="relative z-10">
            {children}
        </div>
      </body>
    </html>
  );
}
