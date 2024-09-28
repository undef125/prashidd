import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import ContextProvider from "@/context/ContextPro";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Event Management System",
  description: "Event management system for college.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster
          position="top-center"
          showSpinner={false}
          height={10}
          color="#F97316"
          shadow="0 0 10px #2299dd, 0 0 5px #f97316"
        />
        <ContextProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ContextProvider>
      </body>
    </html>
  );
}
