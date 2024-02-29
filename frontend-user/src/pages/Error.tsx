import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper title="Error">
      <div className="text-center flex items-center flex-col justify-center h-screen">
        <img
          className="md:max-w-[600px] block mb-8"
          src="/page_not_found.svg"
          alt="not-found"
        />
        <h3 className="text-xl md:text-3xl font-bold mb-4 text-gray-700">
          Ohh! Page Not Found
        </h3>
        <p className="text-muted-foreground mb-2">
          we can't seem to find the page you are looking for
        </p>

        <Button variant="link" className="text-primary text-lg">
          <Link to="/">Back Home</Link>
        </Button>
      </div>
    </Wrapper>
  );
};

export default Error;
