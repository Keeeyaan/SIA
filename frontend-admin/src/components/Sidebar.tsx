import { Link, useLocation } from "react-router-dom";
import {
  Bot,
  BrainCog,
  CircleUser,
  LayoutDashboard,
  MessageCircleQuestion,
  MessageSquareText,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import { useStore } from "@/store";

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

const BigSB = ({ pathname }: { pathname: string }) => {
  return (
    <div>
      <CardHeader className="py-10">
        <div className="flex items-center text-center justify-center">
          <CardTitle className="font-bold">Ucnian Guide Bot Admin</CardTitle>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="p-0">
        <div className="space-y-2">
          <Link
            to="/"
            className={`${buttonVariants({ variant: `${pathname === "/" ? "secondary" : "ghost"}`, size: "lg" })} w-full rounded-none`}
          >
            <span className="flex items-center gap-4 w-full">
              <LayoutDashboard size={24} />
              Dashboard
            </span>
          </Link>
          <Link
            to="/model"
            className={`${buttonVariants({ variant: `${pathname === "/model" ? "secondary" : "ghost"}`, size: "lg" })} w-full rounded-none`}
          >
            <span className="flex items-center gap-4 w-full">
              <Bot size={24} />
              Model
            </span>
          </Link>
          <Link
            to="/intents"
            className={`${buttonVariants({ variant: `${pathname === "/intents" ? "secondary" : "ghost"}`, size: "lg" })} w-full rounded-none`}
          >
            <span className="flex items-center gap-4 w-full">
              <BrainCog />
              Knowledge Base
            </span>
          </Link>
          <Link
            to="/inquiries"
            className={`${buttonVariants({ variant: `${pathname === "/inquiries" ? "secondary" : "ghost"}`, size: "lg" })} w-full rounded-none`}
          >
            <span className="flex items-center gap-4 w-full">
              <MessageCircleQuestion />
              Inquiries
            </span>
          </Link>
          <Link
            to="/feedback"
            className={`${buttonVariants({ variant: `${pathname === "/feedback" ? "secondary" : "ghost"}`, size: "lg" })} w-full rounded-none`}
          >
            <span className="flex items-center gap-4 w-full">
              <MessageSquareText />
              Feedback
            </span>
          </Link>
          <Link
            to="/account"
            className={`${buttonVariants({ variant: `${pathname === "/account" ? "secondary" : "ghost"}`, size: "lg" })} w-full rounded-none`}
          >
            <span className="flex items-center gap-4 w-full">
              <CircleUser />
              Account
            </span>
          </Link>
        </div>
      </CardContent>
    </div>
  );
};

const Sidebar = () => {
  const { sidebarIsClosed } = useStore();
  const { pathname } = useLocation();

  return (
    <Card className="rounded-none">
      <div
        className={`${
          sidebarIsClosed ? "w-[80px]" : "w-[280px]"
        } sticky transition-all ease-in-out duration-300 top-0`}
      >
        {sidebarIsClosed ? <SmallSB /> : <BigSB pathname={pathname} />}
      </div>
    </Card>
  );
};

export default Sidebar;
