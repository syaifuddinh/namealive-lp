import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import PLATFORM from "@/contents/platform.json"

export const metadata: Metadata = {
  title: PLATFORM.companyName + " - Live",
  description: PLATFORM.description,
  openGraph: {
    title: PLATFORM.companyName + " - Live",
    description: PLATFORM.description
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head> 
          <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      </Head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
