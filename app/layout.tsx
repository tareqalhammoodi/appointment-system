import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils"
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "x-system",
  description: "An appointment management system",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-geist-sans antialiased", geistSans.variable)}>
        {children}
      </body>
    </html>
  );
}