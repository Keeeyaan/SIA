import { useState } from "react";
import { Bot } from "lucide-react";

import CreateModelForm from "./CreateModelForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import useFetchKnowledgeBase from "@/hooks/useFetchKnowledgeBase";

const CreateModelButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createIsPending, setCreateIsPending] = useState(false);
  const { data: kbs, isLoading } = useFetchKnowledgeBase();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#214E87] hover:bg-[#3f6ca7]">
          Create Model <Bot className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          if (createIsPending) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create Model</DialogTitle>
          <DialogDescription>
            Create model here with it's corresponding knowledge base version.
            Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        {createIsPending && (
          <div className=" absolute z-50 bg-slate-900 bg-opacity-50  h-full w-full rounded-md">
            <div className="h-full w-full flex justify-center items-center flex-col gap-2">
              <img src="./bot.png" className="animate-spin h-[50px] w-[50px]" />
              <p className="text-white ">Creating...</p>
            </div>
          </div>
        )}
        <CreateModelForm
          kbs={kbs}
          isLoading={isLoading}
          setDialogOpen={setDialogOpen}
          setCreateIsPending={setCreateIsPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateModelButton;
