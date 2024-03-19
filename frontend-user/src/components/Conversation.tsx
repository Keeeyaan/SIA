import Chatbox from "./ChatBox";

const Conversation = () => {
  return (
    <div className="h-full p-10 space-x-[500px] flex flex-col space-y-4">
      <Chatbox type="inquiry" />
      <Chatbox type="response" />
      {/* <Chatbox type="inquiry" />
      <Chatbox type="response" />
      <Chatbox type="inquiry" />
      <Chatbox type="response" />
      <Chatbox type="inquiry" />
      <Chatbox type="response" />
      <Chatbox type="response" />
      <Chatbox type="response" /> */}
    </div>
  );
};

export default Conversation;
