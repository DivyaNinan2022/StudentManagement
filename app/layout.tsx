import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../redux/Providers";
import NavBar from "@/components/Navbar";
import ToastProvider from "@/components/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "using nextks, create the task managemnt app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <NavBar />
            <main style={{ flexGrow: 1, padding: "20px" }}>
              <ToastProvider />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
