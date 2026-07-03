import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeScope } from "@/components/layout/ThemeScope";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Romaric Cathalifaud — Dev · Design · Photo",
  description:
    "Portfolio de Romaric Cathalifaud : développement web, design graphique et photographie. Projets créatifs et expériences interactives.",
  keywords: [
    "Romaric Cathalifaud",
    "portfolio",
    "développeur",
    "designer",
    "photographe",
    "créatif",
  ],
  icons: {
    icon: "/images/planetary-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${instrumentSerif.variable} ${plusJakarta.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ThemeScope>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeScope>
      </body>
    </html>
  );
}
