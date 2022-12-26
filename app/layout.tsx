"use client";
import { usePathname } from "next/navigation";
import Nav from "../components/layout/nav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head />
      <body>
        {pathname !== "/auth" && <Nav />}
        {children}
      </body>
    </html>
  );
}
