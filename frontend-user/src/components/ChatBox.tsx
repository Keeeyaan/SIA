import { useRef, useState } from "react";
import { Copy, Loader2, MessageSquareText, X } from "lucide-react";
import ReactMarkDown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

import useCreateFeedback from "@/hooks/useCreateFeedback";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Typewriter from "./Typewriter";
import { Button } from "./ui/button";
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
  const feedbackRef = useRef<HTMLTextAreaElement>(null);

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
      description: "Text has been copied to your clipboard",
    });
  };

  return (
    <>
      {type === "inquiry" ? (
        <div className="flex flex-row gap-5">
          <Avatar>
            <AvatarImage src="./user.png" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="font-medium text-white">You</h1>
            <Card className="bg-gradient-to-tl bg-opacity-90 border-none w-auto rounded-tl-none">
              <CardHeader className="p-4">
                <p className="text-sm font-medium">{data.inquiry}</p>
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
              <h1 className="font-medium mb-1 text-white">UCnian Guide Bot</h1>
              <Card className="mb-2 rounded-tl-none border-none bg-opacity-90">
                <CardHeader className="p-4">
                  {current_index == length - 1 ? (
                    <Typewriter
                      text={data.response}
                      delay={10}
                      infinite={false}
                    />
                  ) : (
                    <ReactMarkDown
                      rehypePlugins={[
                        remarkGfm,
                        rehypeRaw,
                        [rehypeExternalLinks, { target: "_blank" }],
                      ]}
                      children={data.response}
                      className="markdown text-sm leading-relaxed"
                    />
                  )}
                </CardHeader>
              </Card>
              <div className="text-white flex items-center gap-3 ml-2 mt-3">
                <Copy
                  className="opacity-70 cursor-pointer hover:opacity-100"
                  size={17}
                  strokeWidth={2}
                  onClick={() => copyToClipboardHandler(data.response)}
                />
                <MessageSquareText
                  className="opacity-50 hover:opacity-100 cursor-default hover:cursor-pointer"
                  size={17}
                  strokeWidth={3}
                  onClick={() => setOpen((state) => !state)}
                />
              </div>
              {open && (
                <Card className="mt-3 bg-opacity-90">
                  <form onSubmit={onSubmitHandler}>
                    <CardHeader className="px-4 pt-4 pb-2 flex flex-row items-center justify-between">
                      <div className="flex w-full items-center justify-between">
                        <h1 className="text-sm font-medium">
                          Provide Feedback
                        </h1>
                        <X
                          className="cursor-default hover:cursor-pointer"
                          size={15}
                          onClick={() => setOpen(false)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-2">
                      <Textarea
                        ref={feedbackRef}
                        className="resize-none text-sm"
                        placeholder="Input your feedback here"
                        disabled={createIsPending}
                        rows={1}
                      />
                    </CardContent>
                    <CardFooter className="px-4 pb-4 flex justify-end">
                      <Button type="submit" variant="outline" size="sm">
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
    </>
  );
};

export default ChatBox;
