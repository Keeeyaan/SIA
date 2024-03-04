import { useState } from "react";
import { Check, ChevronsUpDown, PlusSquare } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchIntents from "@/hooks/useFetchIntents";
import useFetchPTandRPByTag from "@/hooks/useFetchPTandRPByTag";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddPatternForm from "@/components/AddPatternForm";
import AddResponseForm from "@/components/AddResponseForm";
import CreateIntentForm from "@/components/CreateIntentForm";

const SkeletonCard = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createIntentDialogOpen, setCreateIntentDialogOpen] = useState(false);

  const { data: intents, isLoading } = useFetchIntents();
  const { data, isLoading: isLoadingPTRP } = useFetchPTandRPByTag(value);

  return (
    <Wrapper norMargin>
      <Dialog
        open={createIntentDialogOpen}
        onOpenChange={setCreateIntentDialogOpen}
      >
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
          <CreateIntentForm setDialogOpen={setCreateIntentDialogOpen} />
        </DialogContent>
      </Dialog>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {intents?.find((intent) => intent.tag === value)?.tag ||
              "Select Tag"}
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

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Patterns</h1>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PlusSquare size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Pattern</DialogTitle>
                  <DialogDescription>
                    Add pattern here with it's corresponding tag. Click submit
                    when you're done.
                  </DialogDescription>
                </DialogHeader>
                <AddPatternForm setDialogOpen={setDialogOpen} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full h-[400px] border rounded overflow-scroll p-4">
            {isLoadingPTRP ? (
              <SkeletonCard />
            ) : (
              data?.patterns.map((pattern, index) => {
                return <p key={index}>{pattern}</p>;
              })
            )}
          </div>
        </CardHeader>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Responses</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PlusSquare size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Response</DialogTitle>
                  <DialogDescription>
                    Add response here with it's corresponding tag. Click submit
                    when you're done.
                  </DialogDescription>
                </DialogHeader>
                <AddResponseForm />
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full h-[400px] border rounded overflow-scroll p-4">
            {isLoadingPTRP ? (
              <SkeletonCard />
            ) : (
              data?.responses.map((response, index) => {
                return <p key={index}>{response}</p>;
              })
            )}
          </div>
        </CardHeader>
      </Card>
    </Wrapper>
  );
};

export default Dashboard;
