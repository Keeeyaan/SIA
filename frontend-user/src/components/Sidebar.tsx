import {
  Sun,
  Bug,
  Trash2,
  HelpCircle,
  // ArrowUpRightFromSquare,
} from "lucide-react";
import { getCookie, setCookie } from "react-use-cookie";

import { Card, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useFetchIntents from "@/hooks/useFetchIntents";

import useCreateConversation from "@/hooks/useCreateConversation";
import useUpdateConversation from "@/hooks/useUpdateConversation";

const Sidebar = () => {
  const { data: intents } = useFetchIntents();

  const { mutate: createConversation, isPending: createIsPending } = useCreateConversation();
  const { mutate: updateConversation, isPending: updateIsPending } = useUpdateConversation();

  const handleOnClickFAQ = (value: string) => {
    const temp = { inquiry: value, kbs_version: "1.0" };

    if (!getCookie("ucnian_guidebot_token")) createConversation(temp)
    else {
      updateConversation({
        ...temp,
        token: getCookie("ucnian_guidebot_token"),
      });
    }
  }

  return (
    <Card className="rounded-none border-none w-[350px]">
      <div className="flex h-screen flex-col justify-between bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50">
        <CardHeader className="p-5 text-center text-slate-800">
          <h1 className="">Frequently Asked Questions</h1>
          <div className="flex flex-col mt-10 space-y-5 text-sm font-medium">
            {
              intents &&
              intents.map((item:any) => {
                return (
                  <Label className="flex items-center mr-5" key={item.id + item.patterns}>
                    <HelpCircle size={18} className=" w-6 h-6 flex-shrink-0" />
                    <Button className="hover:underline text-wrap text-start" variant="link" onClick={() => handleOnClickFAQ(item.patterns)} disabled={createIsPending || updateIsPending}>
                      {item.patterns}
                    </Button>
                  </Label>
                )
              })
            }
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
            <Button
              onClick={() => setCookie("ucnian_guidebot_token", "")}
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
