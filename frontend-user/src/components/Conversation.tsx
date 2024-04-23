import { useRef, useEffect } from "react";
import { IConversation } from "@/api/conversation";
import ChatBox from "./ChatBox";
import Topbar from "./Topbar";
import useFetchVersions from "@/hooks/useFetchVersions";

const Conversation = ({ convo }: { convo: IConversation }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [convo]);

  const { inquiry, setVersion } = useStore();
  const { data: versions } = useFetchVersions();

  useEffect(() => {
    setVersion(versions?.available_versions[0] || "");
  }, [versions]);

  return (
    <div className="h-full w-full">
      <Topbar />
      <div className="h-full w-full pt-4 md:pt-8 max-w-3xl mx-auto pb-4">
        {convo.sequence.map((sequence, index: number) => {
          return (
            <div
              ref={ref}
              className="flex flex-col justify-between gap-y-4 pb-10 px-4"
              key={sequence.createdAt + sequence.inquiry}
            >
              <ChatBox
                type="inquiry"
                data={sequence}
                current_index={index}
                length={convo?.sequence.length}
              />
              <ChatBox
                type="response"
                data={sequence}
                current_index={index}
                length={convo?.sequence.length}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Conversation;
