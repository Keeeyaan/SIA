import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "./ui/card";
import Typewriter from "./Typewriter";
import ReactMarkDown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Loader2, ThumbsDown } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import useCreateFeedback from "@/hooks/useCreateFeedback";
import { Textarea } from "./ui/textarea";

const Chatbox = ({
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

  return (
    <div className="">
      {type === "inquiry" ? (
        <div className="flex gap-4">
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
        <div className="flex flex-col justify-start gap-2">
          <div className="flex gap-4">
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
                <div className="opacity-50 cursor-pointer hover:opacity-100">
                  <Copy size={17} strokeWidth={2} />
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="opacity-50 hover:opacity-100">
                    <ThumbsDown size={17} strokeWidth={2} />
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={onSubmitHandler}>
                      <DialogHeader>
                        <DialogTitle>Provide feedback</DialogTitle>
                        <DialogDescription className="flex flex-col justify-start w-full gap-4 pt-5">
                          Tell us more:
                          <Textarea
                            ref={feedbackRef}
                            className="p-2"
                            placeholder="Input your feedback here"
                            disabled={createIsPending}
                          />
                          <Button type="submit" variant="outline">
                            {createIsPending ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Submit Feedback"
                            )}
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
