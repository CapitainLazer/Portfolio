import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeScope } from "@/components/layout/ThemeScope";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { rootMetadata } from "@/lib/seo";

const dxSitrus = localFont({
  src: [
    {
      path: "../fonts/DxSitrus-Expanded.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/DxSitrus-ExpandedItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-dx-sitrus",
  display: "swap",
});

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

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${dxSitrus.variable} ${instrumentSerif.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <JsonLd />
        <ThemeScope>
          <MotionProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </MotionProvider>
        </ThemeScope>
      </body>
    </html>
  );
}
