import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import React from "react";

interface MainLayoutProps {
  children: JSX.Element;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  title?: string;
}
export const MainLayout = ({
  children,
  toggleSidebar,
  isSidebarOpen,
  title,
}: MainLayoutProps) => {
  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 ml-0 lg:ml-[240px] h-screen">
        <Header toggleSidebar={toggleSidebar} title={title as string} />
        <div className="h-full bg-[#F5F6FA] px-32 py-24">{children}</div>
      </div>
    </div>
  );
};
