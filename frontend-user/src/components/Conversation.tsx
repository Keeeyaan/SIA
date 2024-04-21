import ChatBox from "./ChatBox";

import { IConversation } from "@/api/conversation";
import { Card, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStore } from "@/store";
import Topbar from "./Topbar";

const Conversation = ({ convo }: { convo: IConversation }) => {
  const { inquiry } = useStore();

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
          <div className="flex flex-row gap-5">
            <Avatar>
              <AvatarImage src="./user.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="font-medium text-slate-800">You</h1>
              <Card className="w-auto">
                <CardHeader className="p-4">
                  <h1 className="text-sm">{inquiry}</h1>
                </CardHeader>
              </Card>
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
