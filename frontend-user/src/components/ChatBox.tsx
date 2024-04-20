import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Typewriter from "./Typewriter";
import ReactMarkDown from "react-markdown";
import { Copy, Loader2, MessageSquareText, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import useCreateFeedback from "@/hooks/useCreateFeedback";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

const ChatBox = ({
  type,
  data,
  current_index,
  length,
}: {
  type: "inquiry" | "response";
  data: { inquiry: string; response: string; createdAt: string };
  current_index: number;
  length: number;
}) => {
  const feedbackRef = useRef<HTMLInputElement>();

  const [open, setOpen] = useState(false);

  const { mutate: createFeedback, isPending: createIsPending } =
    useCreateFeedback();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const feedbackValue = feedbackRef.current?.value ?? "";

    const sequence = {
      inquiry: data.inquiry,
      response: data.response,
      createdAt: data.createdAt,
    };

    const feedback = {
      sequence: sequence,
      comment: feedbackValue,
      sentiment: "",
      version: "1.0",
    };

    createFeedback(feedback);

    setOpen(false);
  };

  const copyToClipboardHandler = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied to Clipboard!",
      description: "Text has been copied to your clipboard"
    })
  }

  return (
    <div className="">
      {type === "inquiry" ? (
        <div className="flex flex-row gap-5">
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/847/847969.png?w=826&t=st=1691641237~exp=1691641837~hmac=6371e3f2acfbe7c141349f0c1a8ea64a846ef79be69c39ab7cd6ba738f0ef556" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="font-medium text-slate-800">You</h1>
            <Card className="w-auto">
              <CardHeader className="p-4">
                <h1 className="text-sm">{data.inquiry}</h1>
              </CardHeader>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start">
          <div className="flex flex-row gap-5">
            <Avatar>
              <AvatarImage src="./ucnianguidebotlogo.svg" />
              <AvatarFallback>UCnian Guide Bot</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium">UCnian Guide Bot</h1>
              <Card className="mb-2">
                <CardHeader className="p-4">
                  {current_index == length - 1 ? (
                    <Typewriter
                      text={data.response}
                      delay={20}
                      infinite={false}
                    />
                  ) : (
                    <ReactMarkDown
                      children={data.response}
                      className="markdown text-sm"
                      allowedElements={[
                        "p",
                        "br",
                        "strong",
                        "em",
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6",
                        "ul",
                        "ol",
                        "li",
                      ]}
                    />
                  )}
                </CardHeader>
              </Card>
              <div className="flex items-center gap-3 ml-2">
                <Copy
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  size={17}
                  strokeWidth={2}
                  onClick={() => copyToClipboardHandler(data.response)}
                />
                <MessageSquareText
                  className="opacity-50 hover:opacity-100 cursor-default hover:cursor-pointer"
                  size={17}
                  strokeWidth={2}
                  onClick={() => setOpen(true)}
                />
              </div>
              {open && (
                <Card className="mt-5">
                  <form onSubmit={onSubmitHandler}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <h1 className="text-sm font-medium">Provide Feedback</h1>
                      <X
                        className="cursor-default hover:cursor-pointer"
                        size={15}
                        onClick={() => setOpen(false)}
                      />
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        ref={feedbackRef}
                        className="resize-none"
                        placeholder="Input your feedback here"
                        disabled={createIsPending}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit" variant="outline">
                        {createIsPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
