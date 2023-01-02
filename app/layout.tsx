"use client";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";
import LateralNav from "../components/layout/lateral-nav";
import Nav from "../components/layout/nav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head />
      <body>
        <RecoilRoot>
          {pathname !== "/auth" && <Nav />}
          {pathname !== "/auth" && <LateralNav />}
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
