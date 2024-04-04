import { useRef } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { getCookie } from "react-use-cookie";

import useCreateConversation from "@/hooks/useCreateConversation";
import useUpdateConversation from "@/hooks/useUpdateConversation";

const Bottombar = () => {
  const inquiryRef = useRef<HTMLInputElement>();

  const { mutate: createConversation, isPending: createIsPending } =
    useCreateConversation();
  const { mutate: updateConversation, isPending: updateIsPending } =
    useUpdateConversation();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inquiryValue = inquiryRef.current?.value;

    if (!inquiryValue) {
      return;
    }

    const temp = { inquiry: inquiryValue, kbs_version: "1.0" };

    if (!getCookie("ucnian_guidebot_token")) {
      createConversation(temp);

      if (inquiryRef.current) inquiryRef.current.value = "";
    } else {
      updateConversation({
        ...temp,
        token: getCookie("ucnian_guidebot_token"),
      });

      if (inquiryRef.current) inquiryRef.current.value = "";
    }
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
            placeholder="Message UCnian Guide Bot"
          />
          <Button type="submit" className="rounded-full" variant="outline">
            {createIsPending || updateIsPending ? (
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
