import Bottombar from "@/components/Bottombar";
import myImage from "../assets/uclogo.png";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img
          src={myImage}
          alt="My Image"
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
      <Bottombar />
    </>
  );
};

export default Home;
