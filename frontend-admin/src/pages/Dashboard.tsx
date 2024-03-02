import { useState } from "react";

import Wrapper from "@/components/Wrapper";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";

const status = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "terminated",
    label: "Terminated",
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Wrapper norMargin>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value && (
              <span
                className={`${
                  value === "active"
                    ? "bg-green-500"
                    : value === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                } p-2 rounded-full mr-2`}
              />
            )}
            {value
              ? status.find((stat) => stat.value === value)?.label
              : "Select Tag"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search intent" />
            <CommandEmpty>No stat found.</CommandEmpty>
            <CommandGroup>
              {status.map((stat) => (
                <CommandItem
                  key={stat.value}
                  value={stat.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === stat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {stat.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1>Patterns</h1>
            <Button variant="ghost" size="sm">
              <PlusSquare size={18} />
            </Button>
          </div>
          <div className=""></div>
        </CardHeader>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1>Responses</h1>
            <Button variant="ghost" size="sm">
              <PlusSquare size={18} />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </Wrapper>
  );
};

export default Dashboard;
