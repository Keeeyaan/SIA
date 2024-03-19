import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "./ui/card";

const Chatbox = ({ type }: { type: "inquiry" | "response" }) => {
  return (
    <>
      {type === "inquiry" ? (
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/847/847969.png?w=826&t=st=1691641237~exp=1691641837~hmac=6371e3f2acfbe7c141349f0c1a8ea64a846ef79be69c39ab7cd6ba738f0ef556" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Card className="h-[100px] w-[300px]">
            <CardHeader className="p-4">
              <h1 className="">inquiry</h1>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div className="flex gap-2">
          <Card className="h-[100px] w-[300px]">
            <CardHeader className="p-4">
              <h1 className="">response</h1>
            </CardHeader>
          </Card>
          <Avatar>
            <AvatarImage src="./ucnianguidebotlogo.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
    </>
  );
};

export default Chatbox;
