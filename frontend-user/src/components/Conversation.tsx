import useFetchConversation from "@/hooks/useFetchConversation";
import Chatbox from "./ChatBox";
// import { useStore } from "@/store";

const Conversation = () => {
  const { data: convo } = useFetchConversation()
  // const { inquiry, conversationPending } = useStore()

  

  return (
    <div className="min-h-full min-w-full flex flex-col p-20 gap-y-10">
      {
        convo?.data?.sequence?.map((item: any, index: number) => {
          return (
            <div className="flex flex-col justify-between" key={item.createdAt + item.inquiry}>
              <Chatbox type="inquiry" data={item.inquiry} current_index={index} length={convo?.data?.sequence.length}/>
              <Chatbox type="response" data={item.response} current_index={index} length={convo?.data?.sequence.length}/>
            </div>
          )
        })
      }
      {/* {
        conversationPending && (
          <>
            <div className="flex flex-col justify-between">
              <Chatbox type="inquiry" data={inquiry}/>
              <Chatbox type="response" data={"..."}/>
            </div>
          </>
        )
      } */}
    </div>
  );
};

export default Conversation;
