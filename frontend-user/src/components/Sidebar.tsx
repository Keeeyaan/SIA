import { Sun, Bug, Trash2, HelpCircle } from "lucide-react";
import { setCookie } from "react-use-cookie";

import { Card, CardFooter, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useFetchIntents from "@/hooks/useFetchIntents";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store";
import { toast } from "./ui/use-toast";

const Sidebar = () => {
  const { data: intents } = useFetchIntents();

  const queryClient = useQueryClient();
  const { setFAQ, setInquiry } = useStore();

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

  const handleFAQ = (value: string) => {
    setFAQ(value);
    setInquiry(value);
  };

  return (
    <Card className="hidden md:block rounded-none border-none w-[350px]">
      <div className="flex h-screen flex-col justify-between bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50">
        <CardHeader className="p-5 text-center text-slate-800">
          <h1 className="mb-5">Frequently Asked Questions</h1>
          <div className="flex flex-col mt-10 space-y-5 text-sm font-medium">
            {intents &&
              intents.map((item) => {
                return (
                  <Label
                    className="flex items-center mr-5"
                    key={item._id + item.patterns}
                  >
                    <HelpCircle size={18} className=" w-6 h-6 flex-shrink-0" />
                    <Button
                      className="hover:underline text-wrap text-start"
                      variant="link"
                      onClick={() => handleFAQ(item.patterns)}
                    >
                      {item.patterns}
                    </Button>
                  </Label>
                );
              })}
          </div>
        </CardHeader>
        <div className="space-y-3">
          <CardFooter className="block space-y-3">
            <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
              <Sun className="mr-3 w-6 h-6 flex-shrink-0" />
              Switch to light mode
            </Button>
            <Button className="justify-start bg-transparent hover:bg-yellow-50 text-black">
              <Bug className="mr-3 w-6 h-6 flex-shrink-0" />
              Report any issue
            </Button>
            <Button
              onClick={handleClearConversation}
              className="justify-start bg-transparent hover:bg-yellow-50 text-black"
            >
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
