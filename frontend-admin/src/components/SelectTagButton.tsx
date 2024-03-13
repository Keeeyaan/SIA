import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { IGetIntentsResponse } from "@/api/intents";

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
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tag" />
          <CommandEmpty>No intent found.</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              intents?.map((intent) => (
                <CommandItem
                  key={intent._id.toString()}
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
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectTagButton;
