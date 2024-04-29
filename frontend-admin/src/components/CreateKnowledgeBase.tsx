import { useState } from "react";
import { BrainCog } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import CreateKnowledgeBaseForm from "./CreateKnowledgeForm";

const CreateKnowledgeBaseButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createIsPending, setCreateIsPending] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#214E87] hover:bg-[#3f6ca7]">
          Create Knowledge Base
          <BrainCog className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
          <DialogTitle>Create Knowledge Base</DialogTitle>
          <DialogDescription>
            Create knowledge base here with it's corresponding version. Click
            submit when you're done.
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
        <CreateKnowledgeBaseForm
          setDialogOpen={setDialogOpen}
          setCreateIsPending={setCreateIsPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateKnowledgeBaseButton;
