import { useState } from "react";

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
import { Bot } from "lucide-react";

const SelectModelVersionButton = () => {
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
          Select Model Version
          <Bot className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search Version" />
          <CommandGroup className="overflow-y-scroll"></CommandGroup>
          <CommandEmpty>No version found.</CommandEmpty>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectModelVersionButton;
