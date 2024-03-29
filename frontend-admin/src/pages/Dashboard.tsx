import {
  Bot,
  FolderKanban,
  MessageCircleQuestion,
  MessageSquareText,
} from "lucide-react";

import StatCard from "@/components/StatCard";
import Wrapper from "@/components/Wrapper";
import SelectModelVersionButton from "@/components/SelectModelVersionButton";

const Dashboard = () => {
  return (
    <Wrapper norMargin title="Dashboard">
      <h1 className="text-2xl font-bold mb-4">Welcome User!</h1>
      <div className="flex items-center gap-4 mb-4">
        <StatCard
          title="Models"
          value={50}
          icon={<Bot size={32} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Intents"
          value={50}
          icon={<FolderKanban size={32} />}
        />
        <StatCard
          title="Inquiries"
          value={50}
          icon={<MessageCircleQuestion size={32} />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Feedbacks"
          value={50}
          icon={<MessageSquareText size={32} />}
          color="bg-violet-500"
        />
      </div>
      <SelectModelVersionButton />
    </Wrapper>
  );
};

export default Dashboard;
