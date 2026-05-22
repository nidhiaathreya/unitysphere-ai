import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { ParticleField } from "@/components/effects/ParticleField";
import { UnityAIAssistant } from "@/components/ai/UnityAIAssistant";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: `${APP_NAME} | Global Collaboration Platform`,
  description: APP_TAGLINE,
  keywords: ["AI", "global collaboration", "NGO", "SDG", "crisis response"],
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        <AnimatedBackground />
        <ParticleField />
        <Navbar />
        <main className="relative z-10 min-h-screen pt-16">{children}</main>
        <Footer />
        <UnityAIAssistant />
      </body>
    </html>
  );
}
