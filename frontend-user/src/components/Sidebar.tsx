import { useQueryClient } from "@tanstack/react-query";
import { Sun, Bug, Trash2, HelpCircle, Bot } from "lucide-react";
import { setCookie } from "react-use-cookie";

import useFetchIntents from "@/hooks/useFetchIntents";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useStore } from "@/store";
import { toast } from "./ui/use-toast";
import { Separator } from "./ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetchVersions from "@/hooks/useFetchVersions";

const Sidebar = () => {
  const { data: intents } = useFetchIntents();
  const { data: versions } = useFetchVersions();

  const queryClient = useQueryClient();
  const { setFAQ, setInquiry, setVersion, version } = useStore();

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

  const handleVersionSelect = (version: string) => setVersion(version);

  return (
    <Card className="hidden md:block rounded-none border-none max-w-[310px]">
      <div className="flex h-screen flex-col justify-between bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50">
        <CardHeader className="p-5 text-center text-slate-800">
          <h1 className="mb-2 uppercase text-white p-2 font-semibold bg-[#214E87]">
            Frequently Asked Questions
          </h1>
          <div className="flex flex-col mt-10 space-y-5 text-sm font-medium">
            {intents &&
              intents.map((item) => {
                return (
                  <Button
                    key={item._id + item.patterns}
                    className="flex justify-start items-center h-full w-full text-wrap text-start text-[13px] text-slate-800 py-3 hover:bg-yellow-100"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFAQ(item.patterns)}
                  >
                    <HelpCircle size={18} className="mr-4 flex-shrink-0" />
                    {item.patterns}
                  </Button>
                );
              })}
          </div>
        </CardHeader>
        <div className="space-y-3 w-full">
          <Separator className="bg-slate-900" />
          <CardFooter className="block space-y-1">
            <Select>
              <SelectTrigger className="flex text-[13px] justify-start text-slate-800 py-6 bg-transparent border-none hover:bg-yellow-100">
                <Bot className="mr-4 flex-shrink-0" />
                <SelectValue placeholder={`UCGB ${version}`} />
              </SelectTrigger>
              <SelectContent className="bg-[#214E87]">
                <SelectGroup>
                  <SelectLabel className="text-white">
                    UCGB Versions
                  </SelectLabel>
                  {versions &&
                    versions.available_versions.map((item: any) => {
                      return (
                        <SelectItem
                          className="text-white"
                          value={item}
                          key={item}
                          onClick={() => handleVersionSelect(item)}
                        >
                          UCGB {item}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              disabled
              className="flex justify-start w-full text-wrap text-start text-[13px] text-slate-800 py-6 hover:bg-yellow-100"
              variant="ghost"
              size="sm"
            >
              <Sun size={18} className="mr-4 flex-shrink-0" />
              Switch to light mode
            </Button>
            <Button
              disabled
              className="flex justify-start w-full text-wrap text-start text-[13px] text-slate-800 py-6 hover:bg-yellow-100"
              variant="ghost"
              size="sm"
            >
              <Bug size={18} className="mr-4 flex-shrink-0" />
              Report any issue
            </Button>
            <Button
              className="flex justify-start text-[13px] w-full text-wrap text-start text-slate-800 py-6 hover:bg-yellow-100"
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
