import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppWrapper } from "@/context";
import App from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className={`${inter.className} overflow-hidden lg:m-2`}>
        <AppWrapper>
          <App>{children}</App>
        </AppWrapper>
      </body>
    </html>
  );
}
