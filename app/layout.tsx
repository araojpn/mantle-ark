import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mantle Ark Tarot | Monthly Onchain Animal Tarot",
  description:
    "Generate a shareable Mantle onchain animal tarot reading for this month and next month.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
