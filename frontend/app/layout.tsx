import type { Metadata } from "next";
import "@common/styles/globals.css";
import { AppLayout } from "@features/layout/containers";

export const metadata: Metadata = {
  title: "vidCaption",
  description: "Caption adding to videos",
  icons: "./logo192.png",
  manifest: "./manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppLayout>{children}</AppLayout>
    </html>
  );
}
