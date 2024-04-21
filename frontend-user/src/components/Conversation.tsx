import ChatBox from "./ChatBox";

import { IConversation } from "@/api/conversation";
import { Card, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStore } from "@/store";

const Conversation = ({ convo }: { convo: IConversation }) => {
  const { inquiry } = useStore();

  return (
    <div className="h-full w-full py-14 max-w-3xl mx-auto mb-4">
      {convo?.sequence?.map((item: any, index: number) => {
        return (
          <div
            className="flex flex-col justify-between gap-y-5 mb-10"
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
      {
        inquiry.length > 0 ?
        <div className="flex flex-row gap-5">
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/847/847969.png?w=826&t=st=1691641237~exp=1691641837~hmac=6371e3f2acfbe7c141349f0c1a8ea64a846ef79be69c39ab7cd6ba738f0ef556" />
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
        : ""
      }
    </div>
  );
};

export default Conversation;
