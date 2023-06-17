import { SideBar } from "../components/SideBar";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="ms-16">{children}</div>
        <SideBar />
      </body>
    </html>
  );
}
