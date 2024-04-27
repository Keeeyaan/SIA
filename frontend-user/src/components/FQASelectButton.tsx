import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FQASelectButton = ({
  className,
  FQA,
  setFQA,
}: {
  className?: string;
  FQA: string;
  setFQA: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={`${className}`}>
      <Select
        defaultValue={FQA}
        onValueChange={(value: string) => setFQA(value)}
      >
        <SelectTrigger className="bg-transparent border border-[#214E87] py-5 font-medium">
          <SelectValue placeholder="Select FQA" defaultValue={FQA} />
        </SelectTrigger>
        <SelectContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="font-medium bg-[#214E87] text-white"
        >
          <SelectGroup>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="ccs">CCS</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FQASelectButton;
