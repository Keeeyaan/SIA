import { useState } from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { IGetIntentsResponse } from "@/api/intents";
import { useDeleteIntentByTag } from "@/hooks/useDeleteIntentByTag";

const SelectTagButton = ({
  intents,
  isLoading,
  value,
  setValue,
}: {
  intents?: IGetIntentsResponse[];
  isLoading: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteIntent, isPending } = useDeleteIntentByTag();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {intents?.find((intent) => intent.tag === value)?.tag || "Select Tag"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] h-[500px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tag" />
          <CommandEmpty>No intent found.</CommandEmpty>
          <CommandGroup className=" overflow-y-scroll">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              intents?.map((intent) => (
                <div
                  key={intent._id.toString()}
                  className="flex items-center justify-between gap-2"
                >
                  <CommandItem
                    className="w-full"
                    value={intent.tag}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === intent.tag ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {intent.tag}
                  </CommandItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <X size={15} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove the intent on the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteIntent(intent.tag)}
                        >
                          {isPending ? <Loader2 /> : "Continue"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectTagButton;
