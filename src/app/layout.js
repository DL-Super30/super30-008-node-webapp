
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/navbarWrapper";
import ClientProvider from "../components/clientProvider"; // Import the ClientProvider
import Leads from "./leads/page";
import UpdateModal from "./components/updateModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skill Capital",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarWrapper />
        {/* Wrap content that needs Redux in ClientProvider */}
        <ClientProvider>
          <UpdateModal />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
