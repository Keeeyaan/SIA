import myImage from "../assets/uclogo.png";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={myImage}
        alt="My Image"
        className="w-3/4 h-3/4 object-contain"
      />
    </div>
  );
};

export default Home;
