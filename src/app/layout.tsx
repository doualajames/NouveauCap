import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NouveauCap - Votre compagnon pour une nouvelle vie au Canada",
  description: "La plateforme tout-en-un pour les nouveaux immigrants au Canada. Gérez votre immigration, emploi, logement, finances et plus — adapté à votre statut.",
  keywords: ["immigration canada", "nouveaux immigrants", "résident permanent", "permis travail", "permis études", "installation canada", "emploi canada"],
  authors: [{ name: "NouveauCap" }],
  openGraph: {
    title: "NouveauCap - Votre compagnon pour une nouvelle vie au Canada",
    description: "La plateforme tout-en-un pour les nouveaux immigrants au Canada",
    type: "website",
    locale: "fr_CA",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
