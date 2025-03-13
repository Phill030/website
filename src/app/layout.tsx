import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phill030 - Portfolio",
  applicationName: "Phill030 - Portfolio",
  description:
    "I'm Phill030, a backend developer passionate about building scalable, efficient, and secure systems. I specialize in Rust, cryptography, and server-side architecture, crafting reliable solutions for modern applications.",
  authors: [{ name: "Phill030", url: "https://phill030.de" }],
  keywords: [
    "Phill030",
    "Philipp",
    "Rust",
    "C#",
    "Csharp",
    "JavaScript",
    "TypeScript",
    "React",
    "Backend",
    "ReverseEngineering",
    "Programming",
  ],
  publisher: "Phill030",
  creator: "Phill030",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable}`}>{children}</body>
    </html>
  );
}
