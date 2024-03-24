import {
  Sun,
  Bug,
  Trash2,
  HelpCircle,
  // ArrowUpRightFromSquare,
} from "lucide-react";

import { Card, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <Card className="rounded-none border-none w-[350px]">
      <div className="flex h-screen flex-col justify-between bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50">
        <CardHeader className="p-5 text-center text-slate-800">
          <h1 className="">Frequently Asked Questions</h1>
          <div className="flex flex-col mt-10 space-y-5 text-sm font-medium">
            <div className="flex items-center mr-5">
              <HelpCircle size={18} className=" w-6 h-6 flex-shrink-0" />
              <Button className="hover:underline" variant="ghost">
                How can I get a student ID card?
              </Button>
            </div>
            <Label className="flex items-center mr-5">
              <HelpCircle className="w-6 h-6 flex-shrink-0" />
              <Button className="hover:underline" variant="ghost">
                How can I check my grades?
              </Button>
            </Label>
            <Label className="flex items-center mr-5">
              <HelpCircle className="w-6 h-6 flex-shrink-0" />
              <Button className="hover:underline" variant="ghost">
                How can I get a copy of my studyload?
              </Button>
            </Label>
          </div>
        </CardHeader>
        <div className="space-y-3">
          <Separator className="bg-black" />
          <CardFooter className="block space-y-3">
            <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
              <Sun className="mr-3 w-6 h-6 flex-shrink-0" />
              Switch to light mode
            </Button>
            <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
              <Bug className="mr-3 w-6 h-6 flex-shrink-0" />
              Report any issue
            </Button>
            {/* <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
          <ArrowUpRightFromSquare className="mr-3 w-6 h-6 flex-shrink-0" />
          Got any recommendations?
        </Button> */}
            <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
              <Trash2 className="mr-3 w-6 h-6 flex-shrink-0" />
              Clear conversations
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
