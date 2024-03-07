import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { useStore } from "@/store";
import { Label } from "./ui/label";
import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Sun } from "lucide-react";
import { Bug } from "lucide-react";
import { ArrowUpRightFromSquare } from "lucide-react";
import { Trash2 } from "lucide-react";

const SmallSB = () => {
  return (
    <div>
      <CardHeader className="p-5 flex items-center flex-col">
        <img src="/logo.png" className="w-[40px] h-[40[px]" />
      </CardHeader>
      <Separator />
      <CardContent>
        <div>
          <div>
            <Link to="/" className={buttonVariants({ variant: "ghost" })}>
              Dashboard
            </Link>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

const BigSB = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r px-3 py-4 bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50">
      <Label className="ml-3 text-base bold mt-6">
        Frequently Asked Questions
      </Label>

      <div className="ml-3 flex flex-col mt-10 space-y-5 text-sm font-medium">
        <Label className="flex items-center mr-5">
          <HelpCircle className="mr-5 w-6 h-6 flex-shrink-0" />
          <Link to="/faq" className="hover:underline">
            How can I get a student ID card?
          </Link>
        </Label>

        <Label className="flex items-center mr-5">
          <HelpCircle className="mr-5 w-6 h-6 flex-shrink-0" />
          <Link to="/faq" className="hover:underline">
            How can I check my grades?
          </Link>
        </Label>

        <Label className="flex items-center mr-5">
          <HelpCircle className="mr-5 w-6 h-6 flex-shrink-0" />
          <Link to="/faq" className="hover:underline">
            How can I get a copy of my studyload?
          </Link>
        </Label>
      </div>

      <div className="h-64"></div>
      <Separator />
      <div className="ml-2 flex flex-col mt-5 space-y-3">
        <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
          <Sun className="mr-3 w-6 h-6 flex-shrink-0" />
          <Link to="/path-to-light-mode">Switch to light mode</Link>
        </Button>

        <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
          <Bug className="mr-3 w-6 h-6 flex-shrink-0" />
          Report any issue
        </Button>

        <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
          <ArrowUpRightFromSquare className="mr-3 w-6 h-6 flex-shrink-0" />
          Got any recommendations?
        </Button>

        <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
          <Trash2 className="mr-3 w-6 h-6 flex-shrink-0" />
          Clear conversations
        </Button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { sidebarIsClosed } = useStore();

  return (
    <Card className="rounded-none">
      <div
        className={`${
          sidebarIsClosed ? "w-[80px]" : "w-[280px]"
        } sticky transition-all ease-in-out duration-300 top-0`}
      >
        {sidebarIsClosed ? <SmallSB /> : <BigSB />}
      </div>
    </Card>
  );
};

export default Sidebar;
