import AppSiderbar from "@/components/ui/AppSiderbar";
import Footer from "@/components/ui/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import Topbar from "@/components/ui/Topbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    
    <SidebarProvider>
        <Topbar />
        <AppSiderbar/>
      <main>
        <Outlet /> 
        {/* Page Content will be rendered here */}
        <Footer />
      </main>
    </SidebarProvider>

  );
};

export default Layout;
