import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const Bottombar = () => {
  return (
    <div className="flex flex-col items-start justify-center left-0 z-50 h-32 w-full border-gray-200 bg-blue-500 dark:border-gray-600 dark:bg-gray-700">
      <div className="flex items-center justify-center w-full">
        <Textarea
          className="mt-2 h-12 w-3/4 py-4 px-4 rounded-2xl overflow-auto"
          placeholder="Ask any question here"
        ></Textarea>
        <Button className="flex items-center bg-white hover:bg-blue-200 ml-4 mt-2 rounded-full">
          <Send color="black"></Send>
        </Button>
      </div>
      <Label className="text-xs mt-3 ml-24 text-right w-3/4">
        SIA is still in development, and while we strive for accuracy, there may
        be times when it produces incomplete or inaccurate responses. Thank you
        for understanding!
      </Label>
    </div>
  );
};

export default Bottombar;
