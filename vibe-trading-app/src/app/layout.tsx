import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers.tsx";
import ThemeRegistry from "@/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibe Trading - AI-Powered Trading Strategies",
  description: "Create and execute trading strategies through natural language with AI assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Providers>
            {children}
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
