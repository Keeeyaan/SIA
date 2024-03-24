import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "./ui/card";

const Chatbox = ({ type, data }: { type: "inquiry" | "response", data: string | undefined }) => {
  return (
    <>
      {type === "inquiry" ? (
        <div className="flex justify-start">
          <div className="flex flex-row justify-start gap-x-2 w-1/2">
            <Avatar>
              <AvatarImage src="https://cdn-icons-png.flaticon.com/512/847/847969.png?w=826&t=st=1691641237~exp=1691641837~hmac=6371e3f2acfbe7c141349f0c1a8ea64a846ef79be69c39ab7cd6ba738f0ef556" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Card className="w-auto">
              <CardHeader className="p-4">
                <h1 className="text-sm">{data}</h1>
              </CardHeader>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="flex flex-row justify-end gap-x-2 w-1/2">
            <Card className="w-auto">
              <CardHeader className="p-4">
                <h1 className="text-sm">{data}</h1>
              </CardHeader>
            </Card>
            <Avatar>
              <AvatarImage src="./ucnianguidebotlogo.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
