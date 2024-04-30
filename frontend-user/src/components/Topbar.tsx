import { useQueryClient } from "@tanstack/react-query";
import { Menu, Moon } from "lucide-react";
import { Bug, Trash2, HelpCircle } from "lucide-react";
import { setCookie } from "react-use-cookie";

import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Separator } from "./ui/separator";
import FQASelectButton from "./FQASelectButton";
import { useState } from "react";

const FAQs = [
  {
    type: "general",
    fqas: [
      "What academic programs does University of Cebu Main Campus offer?",
      "How can i pay my tuition online?",
      "What are the requirements to enroll in UC?",
      "How can i get a student ID?",
      "How can i check my grades?",
      "How can i view my outstanding balance?",
    ],
  },
  {
    type: "ccs",
    fqas: [
      "Who is the dean of CCS department?",
      "How much is the tuition for BSIT?",
      "How much is the tuition for BSCS?",
      "What are the names of the faculty members in the CCS department?",
    ],
  },
];

const Topbar = ({ className }: { className?: string }) => {
  const [FQACategory, setFQACategory] = useState("general");
  const [sheetOpen, setSheetOpen] = useState(false);
  const queryClient = useQueryClient();
  const { setFAQ } = useStore();

  const handleClearConversation = () => {
    setCookie("ucnian_guidebot_token", "");
    queryClient.invalidateQueries({
      queryKey: ["conversation"],
    });
    toast({
      title: "Conversation Cleared!",
      description:
        "Your conversation is now cleared. Send us your next inquiry!",
    });
  };

  return (
    <div
      className={cn(
        className,
        "sticky z-40 top-0 block md:hidden bg-[#19375f] p-2"
      )}
    >
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-white" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="flex flex-col justify-between h-full">
            <CardHeader className="p-4 text-center">
              <h1 className="mt-8 mb-2 uppercase text-white p-2 font-semibold bg-[#214E87]">
                Frequently Asked Questions
              </h1>
              <FQASelectButton
                className="pb-4"
                FQACategory={FQACategory}
                setFQACategory={setFQACategory}
              />
              <div className="flex flex-col space-y-1">
                {FAQs.find((faq) => faq.type === FQACategory)?.fqas.map(
                  (item, index) => (
                    <Button
                      key={index}
                      className="flex justify-start items-center h-full w-full text-wrap text-start text-[13px] text-slate-800 py-3 hover:bg-blue-50"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSheetOpen(false);
                        setFAQ(item);
                      }}
                    >
                      <HelpCircle size={18} className="mr-4 flex-shrink-0" />
                      {item}
                    </Button>
                  )
                )}
              </div>
            </CardHeader>
            <div className="space-y-3 w-full">
              <Separator className="bg-slate-900" />
              <CardFooter className="p-4 block space-y-1">
                <Button
                  disabled
                  className="flex justify-start w-full text-wrap text-start text-[13px] text-slate-800 py-6 hover:bg-blue-50"
                  variant="ghost"
                  size="sm"
                >
                  <Moon size={18} className="mr-4 flex-shrink-0" />
                  Switch to dark mode
                </Button>
                <Button
                  disabled
                  className="flex justify-start w-full text-wrap text-start text-[13px] text-slate-800 py-6 hover:bg-blue-50"
                  variant="ghost"
                  size="sm"
                >
                  <Bug size={18} className="mr-4 flex-shrink-0" />
                  Report any issue
                </Button>
                <Button
                  className="flex justify-start w-full text-wrap text-start text-[13px] text-slate-800 py-6 hover:bg-blue-50"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearConversation}
                >
                  <Trash2 size={18} className=" mr-4 flex-shrink-0" />
                  Clear Conversation
                </Button>
              </CardFooter>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Topbar;
