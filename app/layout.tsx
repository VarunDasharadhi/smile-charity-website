import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smilechildrenscharity.com"),
  title: {
    default: "SMILE Children's Charity | Supporting Families Across Lanarkshire",
    template: "%s | SMILE Children's Charity",
  },
  description:
    "SMILE Children's Charity supports families of children with disabilities and serious illness across Lanarkshire. Donate, volunteer, or fundraise to help build SMILE House.",
  keywords: ["children's charity", "Lanarkshire", "disability support", "SMILE House", "fundraising", "Larkhall"],
  openGraph: {
    siteName: "SMILE Children's Charity",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {/* GA4: drop <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" /> here when Stephen supplies property ID */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
