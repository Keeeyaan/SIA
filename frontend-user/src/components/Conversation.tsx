import Chatbox from "./ChatBox";

import { IConversation } from "@/api/conversation";

const Conversation = ({ convo }: { convo: IConversation }) => {
  return (
    <div className="h-full w-full py-14 max-w-3xl mx-auto mb-4">
      {convo?.sequence?.map((item: any, index: number) => {
        return (
          <div
            className="flex flex-col justify-between gap-y-4 mb-10"
            key={item.createdAt + item.inquiry}
          >
            <Chatbox
              type="inquiry"
              data={item}
              current_index={index}
              length={convo?.sequence.length}
            />
            <Chatbox
              type="response"
              data={item}
              current_index={index}
              length={convo?.sequence.length}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
