"use client"; // Mark as a client component

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname(); // Get current route

  // Define the routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ["/admindashboard", "/adminlogin"];

  // Check if the current route is in the list
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      {children}
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}
