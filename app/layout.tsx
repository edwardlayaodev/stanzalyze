import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./globals.css";
import { Organism } from "./_components/organisms";

const arvo = Arvo({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arvo.className} text-base-content`}>
        <Organism.Navbar />
        {children}
        <Organism.Footer />
      </body>
    </html>
  );
}
