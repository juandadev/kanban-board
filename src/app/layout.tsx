import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["500", "700"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Create free kanban boards for your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>
        <Providers>{children}</Providers>
        <div className="modal"></div>
      </body>
    </html>
  );
}
