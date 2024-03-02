import { Search } from "lucide-react";

import { Input } from "./ui/input";

interface SearchInputProps {
  type: "text" | "number" | "email" | "password";
  label?: string;
  defaultValue?: string;
  value?: string | number;
  name?: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  type,
  defaultValue,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="text-gray-500" />
      </div>
      <Input
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className="block w-[300px] p-5 ps-12 border-non transition text-gray-900 "
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
