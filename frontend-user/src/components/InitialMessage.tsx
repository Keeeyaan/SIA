import Topbar from "./Topbar";
import { Card } from "./ui/card";

const InitialMessage = () => {
  const messages = [
    "I'm a chatbot designed to answer your school-related questions.",
    "Need information on a specific subject or questions about your school's policies? Just ask!",
    "I'm available 24/7 to provide you with reliable information.",
    "I'm constantly learning and improving. If I don't have an answer, I'll do my best to find it for you!",
  ];

  return (
    <div className="h-full w-full flex flex-col ">
      <Topbar />
      <div className="h-full flex justify-center flex-col items-center space-y-4 ">
        <img
          className="w-[150px] md:w-[200px]"
          src="./ucnianguidebotlogo.svg"
        />
        <h1 className="text-3xl font-semibold md:text-4xl text-white">
          UCnian Guide Bot
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {messages.map((message, index) => (
            <Card
              key={index}
              className="max-w-[220px] p-3 font-medium text-center"
            >
              <h1 className="text-sm text-black">{message}</h1>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialMessage;
