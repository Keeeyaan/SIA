import Bottombar from "@/components/Bottombar";
import Conversation from "@/components/Conversation";
import InitialMessage from "@/components/InitialMessage";
import useFetchConversation from "@/hooks/useFetchConversation";

const Home = () => {
  const { data: convo } = useFetchConversation();

  return (
    <>
      <div
        className={`${convo?.sequence.length && "overflow-y-scroll"} flex items-center justify-center h-full w-full bg-no-repeat bg-center bg-[url('/uclogo.png')] bg-[#17AEDA] bg-opacity-20`}
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
