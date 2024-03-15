import Bottombar from "@/components/Bottombar";
import InitialMessage from "@/components/InitialMessage";

const Home = () => {
  return (
    <>
      <div
        className={`flex items-center justify-center h-full w-full bg-no-repeat bg-center bg-[url('/uclogo.png')] bg-[#17AEDA] bg-opacity-10`}
      >
        <InitialMessage />
      </div>
      <Bottombar />
    </>
  );
};

export default Home;
