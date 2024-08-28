import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import ReactQueryProvider from "@/components/query-client";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlyPicker Nextjs task",
  description: "Created by Suresh Pal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
