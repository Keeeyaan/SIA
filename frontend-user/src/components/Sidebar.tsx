import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Bug, Trash2, HelpCircle, Moon } from "lucide-react";
import { setCookie } from "react-use-cookie";

import { Card, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Separator } from "./ui/separator";
import FQASelectButton from "./FQASelectButton";
import { useStore } from "@/store";
import { ScrollArea } from "./ui/scroll-area";

const FAQs = [
  {
    type: "general",
    fqas: [
      "What academic programs does University of Cebu Main Campus offer?",
      "How can I pay my tuition online?",
      "What are the requirements to enroll in UC?",
      "How can I get a student ID?",
      "How can I check my grades?",
      "How can I view my outstanding balance?",
      "Where can I see my enrollment status?",
      "How do I access my course's prospectus?",
      "How do I obtain a copy of my study load?",
      "Can I still change my subjects after enrolling?",
    ],
  },
  {
    type: "ccs",
    fqas: [
      "Who is the dean of CCS department?",
      "How much is the tuition for BSIT?",
      "How much is the tuition for BSCS?",
      "What are the names of the faculty members in the CCS department?",
      "Where can I find the ccs department?",
      "What are the social media accounts for ccs?",
      "what organizations does CCS department have?",
      "Do CCS courses have an entrance exam?",
    ],
  },
];

const Sidebar = () => {
  const [FQACategory, setFQACategory] = useState("general");
  const { setFAQ } = useStore();
  const queryClient = useQueryClient();

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
    <Card className="hidden md:block rounded-none border-none max-w-[310px]">
      <div className="w-full flex h-screen flex-col justify-between bg-white ">
        <CardHeader className="p-5 text-center text-slate-800">
          <h1 className="mb-2 uppercase text-white p-2 font-semibold bg-[#214E87]">
            Frequently Asked Questions
          </h1>
          <FQASelectButton
            className="pb-4"
            FQACategory={FQACategory}
            setFQACategory={setFQACategory}
          />
            <div className="flex flex-col space-y-2 text-sm font-medium h-[60vh]">
              <ScrollArea>
                {FAQs.find((faq) => faq.type === FQACategory)?.fqas.map(
                  (item, index) => (
                    <Button
                      key={index}
                      className="flex justify-start items-center h-full w-full text-wrap text-start text-[13px] text-slate-800 py-3 hover:bg-blue-50"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFAQ(item)}
                    >
                      <HelpCircle size={18} className="mr-4 flex-shrink-0" />
                      {item}
                    </Button>
                  )
                )}
              </ScrollArea>
            </div>
        </CardHeader>
        <div className="space-y-3 w-full">
          <Separator className="bg-slate-900" />
          <CardFooter className="block space-y-1">
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
              className="flex justify-start text-[13px] w-full text-wrap text-start text-slate-800 py-6 hover:bg-blue-50"
              variant="ghost"
              size="sm"
              onClick={handleClearConversation}
            >
              <Trash2 size={18} className=" mr-4 flex-shrink-0" />
              Clear Conversation
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
