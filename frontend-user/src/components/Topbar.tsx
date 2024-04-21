import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Topbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "sticky z-40 top-0 block md:hidden bg-[#19375f] p-2"
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-white" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className=" bg-gradient-to-t from-yellow-200 to-yellow-100 "
        >
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          asd
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Topbar;
