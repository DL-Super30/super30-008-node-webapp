
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/navbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <NavbarWrapper />
        {children}
      </body>
    </html>

  );
}
