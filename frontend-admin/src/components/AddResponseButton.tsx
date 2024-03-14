import { useState } from "react";
import { PlusSquare } from "lucide-react";

import AddResponseForm from "./AddResponseForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const AddResponseButton = ({ value }: { value: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PlusSquare size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Response</DialogTitle>
          <DialogDescription>
            Add response here with it's corresponding tag. Click submit when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <AddResponseForm tag={value} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddResponseButton;
