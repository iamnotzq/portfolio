import type { Metadata } from "next";
import { Orbitron, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zhi Qiang's Portfolio",
  description: "Portfolio created using Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variables to the <html> tag so they are globally available
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}>
      {/* Apply the default font-sans class to the <body> */}
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
