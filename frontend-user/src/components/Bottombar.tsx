import { useRef } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useCreateInquiry from "@/hooks/useCreateInquiry";

const Bottombar = () => {
  const inquiryRef = useRef<HTMLInputElement>();

  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inquiryValue = inquiryRef.current?.value;
    if (!inquiryValue) {
      return;
    }
    const data = { inquiry: inquiryValue };
    // createInquiry(data);
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center w-full bg-[#214E87]">
      <div className="p-6">
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-center items-center w-full gap-4"
        >
          <Input
            ref={inquiryRef}
            className="p-6 w-3/4 rounded-full"
            placeholder="Ask any question here"
          />
          <Button type="submit" className="rounded-full" variant="outline">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </form>
        <p className="text-xs text-white mt-3 text-center">
          SIA is still in development, and while we strive for accuracy, there
          may be times when it produces incomplete or inaccurate responses.
          Thank you for understanding!
        </p>
      </div>
    </div>
  );
};

export default Bottombar;
