import { useState } from "react";

import CreateIntentForm from "./CreateIntentForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const CreateIntentButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">
          Create Intent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Intent</DialogTitle>
          <DialogDescription>
            Create intent here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateIntentForm setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateIntentButton;
