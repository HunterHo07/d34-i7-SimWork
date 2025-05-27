import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SimWork - Immersive Skills Assessment Platform",
  description: "Transform hiring with immersive 3D simulations that test real-world skills. No more broken interviews—just authentic, engaging assessments that predict job performance.",
  keywords: "skills assessment, hiring platform, 3D simulation, job interview, talent acquisition",
  authors: [{ name: "SimWork Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
