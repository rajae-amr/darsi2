import type { Metadata } from "next";
import { Cairo, Tajawal, Almarai, Geist_Mono } from "next/font/google";
import "./globals.css";
import Toaster from "./components/ui/Toaster";
import { AuthProvider } from "@/app/providers/auth";
import AppLayout from "./components/layouts/AppLayout";
import { cairo, tajawal, almarai, fontVariables } from './styles/fonts';

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darsi - منصة درسي",
  description: "Darsi platform - منصة درسي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} ${almarai.variable} ${geistMono.variable} font-sans flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
