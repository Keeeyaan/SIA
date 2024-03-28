import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "./ui/card";
import Typewriter from "./Typewriter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, ThumbsDown } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import useCreateFeedback from "@/hooks/useCreateFeedback";
import { Textarea } from "./ui/textarea";


const Chatbox = ({ type, data, current_index, length }: { type: "inquiry" | "response", data: { inquiry: string, response: string, createdAt: string }, current_index: number, length: number }) => {
  const feedbackRef = useRef<HTMLInputElement>();

  const [open, setOpen] = useState(false)

  const { mutate: createFeedback, isPending: createIsPending } = useCreateFeedback()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const feedbackValue = feedbackRef.current?.value ?? "";

    const sequence = { 
      "inquiry": data.inquiry, 
      "response": data.response,
      "createdAt": data.createdAt
    }

    const feedback = {
      "sequence": sequence,
      "comment": feedbackValue,
      "sentiment": "",
      "version": "1.0"
    }

    createFeedback(feedback)

    setOpen(false)
  };

  return (
    <>
      {type === "inquiry" ? (
        <div className="flex justify-end">
          <div className="flex flex-row justify-end gap-x-2 w-[45%]">
            <Card className="w-auto">
              <CardHeader className="p-4">
                <h1 className="text-sm">{data.inquiry}</h1>
              </CardHeader>
            </Card>
            <Avatar>
              <AvatarImage src="https://cdn-icons-png.flaticon.com/512/847/847969.png?w=826&t=st=1691641237~exp=1691641837~hmac=6371e3f2acfbe7c141349f0c1a8ea64a846ef79be69c39ab7cd6ba738f0ef556" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      ) : (
        <div className="flex justify-start">
          <div className="flex flex-row justify-start gap-x-2 w-[45%]">
            <Avatar>
              <AvatarImage src="./ucnianguidebotlogo.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Card className="w-auto">
              <CardHeader className="flex flex-col gap-y-2 p-5">
                {
                  current_index == length - 1 ? <Typewriter text={data.response} delay={20} infinite={false} /> :
                  <h1 className="text-sm">{data.response}</h1>
                }
                <div className="flex flex-row justify-end">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="opacity-15 hover:opacity-60">
                      <ThumbsDown size={15} strokeWidth={3}/>
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
                              {
                                createIsPending ? <Loader2 className="animate-spin" /> :
                                "Submit Feedback"
                              }
                            </Button>
                        </DialogDescription>
                      </DialogHeader>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
