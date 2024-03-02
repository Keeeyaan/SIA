import { Bell, Calendar, PanelLeftOpen, PanelRightOpen } from "lucide-react";

import UserProfile from "./UserProfile";
import SearchInput from "./SearchInput";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const Topbar = () => {
  const sidebarIsClosed = true;

  return (
    <Card className="sticky inset-x-0 top-0 z-30 border-t-0 border-x-0 w-full rounded-none backdrop-blur-lg transition-all">
      <div className="w-full h-full flex items-center px-6 py-5 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="px-2 text-gray-800">
            {sidebarIsClosed ? <PanelLeftOpen /> : <PanelRightOpen />}
          </Button>
          <SearchInput type="text" placeholder="Search" />
        </div>
        <div className="flex items-center gap-6 text-gray-800">
          <div className="p-2 border rounded-full">
            <Bell size={20} />
          </div>
          <div className="p-2 border rounded-full">
            <Calendar size={20} />
          </div>
          <UserProfile />
        </div>
      </div>
    </Card>
  );
};

export default Topbar;
