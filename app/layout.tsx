import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import DarkModeContext from "./DarkModeContext";
import NavBar from "./NavBar";
import meta from "@/public/meta.png";

const inter = Inter({
  subsets: ["latin"],
  // display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Reset your preferences | Next.js",
  description: "Simple app to show how you can save your deeds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Reset your preferences | Next.js</title>
      <meta name="title" content="Reset your preferences | Next.js" />
      <meta
        name="description"
        content="Simple app to show how you can save your deeds."
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://next-preference-reset.vercel.app/"
      />
      <meta property="og:title" content="Reset your preferences | Next.js" />
      <meta
        property="og:description"
        content="Simple app to show how you can save your deeds."
      />
      <meta property="og:image" content={meta.src} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://next-preference-reset.vercel.app/"
      />
      <meta
        property="twitter:title"
        content="Reset your preferences | Next.js"
      />
      <meta
        property="twitter:description"
        content="Simple app to show how you can save your deeds."
      />
      <meta property="twitter:image" content={meta.src} />

      <body className={inter.variable}>
        <DarkModeContext>
          <Theme accentColor="iris" radius="none">
            <NavBar />
            <main className="px-5">{children}</main>
          </Theme>
        </DarkModeContext>
      </body>
    </html>
  );
}
