import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Record Record - Vinyl Collection Manager",
  description:
    "A modern vinyl record collection manager built with Next.js and integrated with the Discogs API",
  keywords: ["vinyl", "records", "collection", "music", "discogs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
