import Bottombar from "@/components/Bottombar";
import Conversation from "@/components/Conversation";
import InitialMessage from "@/components/InitialMessage";

const Home = () => {
  const data = [{}];

  return (
    <>
      <div
        className={`${data.length && "overflow-y-scroll"} flex items-center justify-center h-full w-full bg-no-repeat bg-center bg-[url('/uclogo.png')] bg-[#17AEDA] bg-opacity-20`}
      >
        {data.length ? <Conversation /> : <InitialMessage />}
      </div>
      <Bottombar />
    </>
  );
};

export default Home;
