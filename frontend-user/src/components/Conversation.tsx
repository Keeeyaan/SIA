import ChatBox from "./ChatBox";

import { IConversation } from "@/api/conversation";
import { Card, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStore } from "@/store";
import Topbar from "./Topbar";
import useFetchVersions from "@/hooks/useFetchVersions";
import { useEffect } from "react";

const Conversation = ({ convo }: { convo: IConversation }) => {
  const { inquiry, setVersion } = useStore();
  const { data: versions } = useFetchVersions();

  useEffect(() => {
    setVersion(versions?.available_versions[0] || "")
  }, [versions])

  return (
    <div className="h-full w-full">
      <Topbar />
      <div className="h-full w-full mt-4 md:mt-8 max-w-3xl mx-auto mb-4">
        {convo?.sequence?.map((item, index: number) => {
          return (
            <div
              className="flex flex-col justify-between gap-y-4 pb-10 px-4"
              key={item.createdAt + item.inquiry}
            >
              <ChatBox
                type="inquiry"
                data={item}
                current_index={index}
                length={convo?.sequence.length}
              />
              <ChatBox
                type="response"
                data={item}
                current_index={index}
                length={convo?.sequence.length}
              />
            </div>
          );
        })}
        {inquiry.length > 0 ? (
          <div className="h-full w-full mt-4 md:mt-8 max-w-3xl mx-auto mb-4">
            <div className="flex flex-col justify-between gap-y-4 pb-10 px-4">
              <div className="flex flex-row gap-5">
                <Avatar>
                  <AvatarImage src="./user.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h1 className="font-medium text-white">You</h1>
                  <Card className="bg-yellow-200 border-none w-auto rounded-tl-none">
                    <CardHeader className="p-4">
                      <p className="text-sm font-medium">{inquiry}</p>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Conversation;
