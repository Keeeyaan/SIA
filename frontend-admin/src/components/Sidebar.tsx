import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
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

const BigSB = () => {
  return (
    <div>
      <CardHeader className="p-5">
        <div className="flex items-center gap-2 justify-center">
          {/* <img src="/logo.png" className="w-[40px] h-[40[px]" /> */}
          <CardTitle>Guide Bot Admin</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div>
          <div>
            <Link
              to="/"
              className={`${buttonVariants({ variant: "ghost" })} w-full rounded-none`}
            >
              Dashboard
            </Link>
          </div>
          <div>
            <Link
              to="/inquiries"
              className={`${buttonVariants({ variant: "ghost" })} w-full rounded-none`}
            >
              Inquiries
            </Link>
          </div>
          <div>
            <Link
              to="/feedback"
              className={`${buttonVariants({ variant: "ghost" })} w-full rounded-none`}
            >
              Feedback
            </Link>
          </div>
        </div>
      </CardContent>
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
        } sticky transition-all ease-in-out duration-300`}
      >
        {sidebarIsClosed ? <SmallSB /> : <BigSB />}
      </div>
    </Card>
  );
};

export default Sidebar;
