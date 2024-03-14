import { useState } from "react";
import { Loader, MoreHorizontal } from "lucide-react";

import EditForm from "./EditForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { useDeleteIntentPattern } from "@/hooks/useDeleteIntentPattern";
import { useDeleteIntentResponse } from "@/hooks/useDeleteIntentResponse";

const TableAction = ({
  item,
  itemHead,
  tag,
  id,
}: {
  item: string;
  itemHead: string;
  tag: string;
  id: number;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deletePattern, isPending: deletePatternIsPending } =
    useDeleteIntentPattern();
  const { mutate: deleteResponse, isPending: deleteResponseIsPending } =
    useDeleteIntentResponse();

  const deleteHandler = () => {
    if (itemHead === "Pattern") {
      deletePattern({ tag, id });
    } else if (itemHead === "Response") {
      deleteResponse({ tag, id });
    } else {
      return;
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-blue-500"
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {itemHead} Item</DialogTitle>
            <DialogDescription>
              Make changes to {itemHead.toLowerCase()} here. Click submit when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <EditForm
            setIsEditDialogOpen={setIsEditDialogOpen}
            id={id}
            tag={tag}
            item={item}
            type={itemHead}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              pattern on the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteHandler}>
              {deletePatternIsPending || deleteResponseIsPending ? (
                <Loader />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TableAction;
