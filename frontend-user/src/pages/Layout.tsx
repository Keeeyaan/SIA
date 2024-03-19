import { Outlet } from "react-router-dom";

import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
