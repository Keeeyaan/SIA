import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <main className="w-full space-y-4">
        <Topbar />
        <Outlet />
      </main>
    </main>
  );
};

export default Layout;
