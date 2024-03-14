import { PanelLeftOpen, PanelRightOpen } from "lucide-react";

import UserProfile from "./UserProfile";
import SearchInput from "./SearchInput";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useStore } from "@/store";

const Topbar = () => {
  const { sidebarIsClosed, setSidebarIsClosed } = useStore();

  return (
    <Card className="bg-[#214E87] sticky inset-x-0 top-0 z-30 border-t-0 border-x-0 w-full rounded-none backdrop-blur-lg transition-all">
      <div className="w-full h-full flex items-center px-6 py-5 justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-white"
            onClick={setSidebarIsClosed}
          >
            {sidebarIsClosed ? <PanelLeftOpen /> : <PanelRightOpen />}
          </Button>
          <SearchInput type="text" placeholder="Search" />
        </div>
        <div className="text-gray-800">
          <UserProfile />
        </div>
      </div>
    </Card>
  );
};

export default Topbar;
