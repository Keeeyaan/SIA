import { useState } from "react";
import { BrainCog, Check, Loader2, X } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { IGetKnowledgeBaseResponse } from "@/api/kbs";
import { cn } from "@/lib/utils";
import { IGetIntentsResponse } from "@/api/intents";
import { useDeleteKnowledgeBase } from "@/hooks/useDeleteKnowledgeBaseVersion";

const SelectModelVersionButton = ({
  kbs,
  isLoading,
  value,
  setValue,
  setSpecKBS,
  setTagValue,
}: {
  kbs: IGetKnowledgeBaseResponse[] | undefined;
  isLoading: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSpecKBS: React.Dispatch<React.SetStateAction<IGetIntentsResponse[]>>;
  setTagValue: React.Dispatch<
    React.SetStateAction<IGetIntentsResponse | undefined>
  >;
}) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteKnowledgeBaseVersion, isPending } =
    useDeleteKnowledgeBase();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[100px]"
        >
          {kbs?.find((model) => model.version === value)?.version ||
            "Select Knowledge Base Version"}
          <BrainCog className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[200px] w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search Version" />
          <CommandGroup className="overflow-y-scroll">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              kbs?.map((model) => (
                <div
                  key={model._id.toString()}
                  className="flex items-center justify-between gap-2"
                >
                  <CommandItem
                    className="w-full"
                    value={model.version}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      const filteredKBS = kbs.filter(
                        (kb) => kb.version === currentValue
                      )[0].intents;
                      setSpecKBS(currentValue === value ? [] : filteredKBS);
                      setTagValue &&
                        setTagValue(
                          currentValue === value ? undefined : undefined
                        );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === model.version ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {model.version}
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
                          remove the knowledge base version on the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteKnowledgeBaseVersion(model._id)}
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
          <CommandEmpty>No version found.</CommandEmpty>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectModelVersionButton;
