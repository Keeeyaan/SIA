import Bottombar from "@/components/Bottombar";
import Conversation from "@/components/Conversation";
import InitialMessage from "@/components/InitialMessage";
import useFetchConversation from "@/hooks/useFetchConversation";

const Home = () => {
  const { data: convo } = useFetchConversation();

  return (
    <>
      <div
        className={`${convo?.sequence.length && "overflow-y-auto scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-100"} flex items-center justify-center h-full w-full bg-no-repeat bg-center bg-[url('/uclogo.png')] bg-[#19375f]  `}
      >
        {convo?.sequence.length ? (
          <Conversation convo={convo} />
        ) : (
          <InitialMessage />
        )}
      </div>
      <Bottombar />
    </>
  );
};

export default Home;
