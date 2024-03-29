import { ReactNode } from "react";

import { Card } from "./ui/card";

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}) => {
  return (
    <Card className="p-4 w-[300px] flex items-center justify-between">
      <div className="">
        <h1 className="text-muted-foreground">{title}</h1>
        <p className="text-xl font-medium">{value}</p>
      </div>
      <div
        className={`${color ? color : "bg-green-500"} rounded-full w-[60px] h-[60px] flex items-center justify-center text-white`}
      >
        {icon}
      </div>
    </Card>
  );
};

export default StatCard;
