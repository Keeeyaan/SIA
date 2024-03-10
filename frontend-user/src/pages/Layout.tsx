import { Outlet } from "react-router-dom";

import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <main className="w-full flex flex-col justify-between space-y-4">
        <Outlet />
      </main>
    </main>
  );
};

export default Layout;
