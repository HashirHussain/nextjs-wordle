import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle",
  description:
    "Wordle game build on nextJS TypeScript TailwindCSS and redux toolkit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
