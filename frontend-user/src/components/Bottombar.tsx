import { useEffect, useRef } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { getCookie } from "react-use-cookie";

import useCreateConversation from "@/hooks/useCreateConversation";
import useUpdateConversation from "@/hooks/useUpdateConversation";
import { useStore } from "@/store";

const Bottombar = () => {
  const inquiryRef = useRef<HTMLInputElement>(null);

  const { mutate: createConversation, isPending: createIsPending } =
    useCreateConversation();
  const { mutate: updateConversation, isPending: updateIsPending } =
    useUpdateConversation();

  const { setInquiry, FAQ } = useStore();

  useEffect(() => {
    handleFormSubmission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmission = () => {
    let value = "";

    inquiryRef.current?.value && setInquiry(inquiryRef.current?.value);

    if (inquiryRef.current?.value) value = inquiryRef.current.value;
    if (FAQ) value = FAQ;

    if (!value) {
      return;
    }

    const temp = { inquiry: value, kbs_version: "1.0" };

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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inquiryRef.current?.value && setInquiry(inquiryRef.current?.value);
    handleFormSubmission();
  };

  return (
    <div className="flex flex-col justify-center w-full bg-[#214E87] border-t-white border-t-[1px]">
      <div className="p-6">
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-center items-center w-full gap-2"
        >
          <Input
            ref={inquiryRef}
            className="lg:w-[700px] rounded-full border-none md:h-12"
            placeholder="Ask your questions here..."
          />
          <Button
            type="submit"
            className="rounded-full border-none p-3 md:p-4 md:h-12"
            variant="outline"
            disabled={createIsPending || updateIsPending}
          >
            {createIsPending || updateIsPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </form>
        <p className="text-[11px] md:text-xs text-white mt-3 text-center">
          UCnian Guide Bot still in development, so responses may be incomplete
          or inaccurate at times. Thanks for understanding!
        </p>
      </div>
    </div>
  );
};

export default Bottombar;
