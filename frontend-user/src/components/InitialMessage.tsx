import { Card, CardDescription, CardHeader } from "./ui/card";

const InitialMessage = () => {
  return (
    <div className="flex justify-center flex-col items-center space-y-4">
      <img src="./ucnianguidebotlogo.svg" />
      <h1 className="font-semibold text-4xl text-[#2b4f7e]">
        UCnian Guide Bot
      </h1>
      <div className="flex justify-center items-center gap-4 opacity-[0.85] font-medium text-justify">
        <Card className="max-w-[300px]">
          <CardHeader>
            <CardDescription className="text-base text-slate-900">
              A chatbot designed to answer your school-related questions.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-[350px]">
          <CardHeader>
            <CardDescription className="text-base text-slate-900">
              Want to know more about a particular subject? Or do you have
              questions about your school's policies or procedures? Just ask me!
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-[300px]">
          <CardHeader>
            <CardDescription className="text-base text-slate-900">
              I'm available 24/7 to provide you with accurate and reliable
              information.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-[350px]">
          <CardHeader>
            <CardDescription className="text-base text-slate-900">
              I'm always learning and improving, so if I don't know the answer
              to your question, I'll do my best to find it for you.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default InitialMessage;
