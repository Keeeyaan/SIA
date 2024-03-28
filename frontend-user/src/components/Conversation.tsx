import useFetchConversation from "@/hooks/useFetchConversation";
import Chatbox from "./ChatBox";

const Conversation = () => {
  const { data: convo } = useFetchConversation()

  return (
    <div className="h-[90%] w-[90%]">
      {
        convo?.data?.sequence?.map((item: any, index: number) => {
          return (
            <div className="flex flex-col justify-between gap-y-10" key={item.createdAt + item.inquiry}>
              <Chatbox type="inquiry" data={item} current_index={index} length={convo?.data?.sequence.length}/>
              <Chatbox type="response" data={item} current_index={index} length={convo?.data?.sequence.length}/>
            </div>
          )
        })
      }
    </div>
  );
};

export default Conversation;
