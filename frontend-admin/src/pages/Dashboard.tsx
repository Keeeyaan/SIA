import {
  Angry,
  Bot,
  FolderKanban,
  Meh,
  MessageCircleQuestion,
  MessageSquareText,
  Smile,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  LabelList,
  AreaChart,
  Area,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import Wrapper from "@/components/Wrapper";
import { Separator } from "@/components/ui/separator";
import useFetchStats from "@/hooks/useFetchStats";
import useFetchIntents from "@/hooks/useFetchIntents";
import useFetchFeedbacks from "@/hooks/useFetchFeedbacks";
import useFetchInquiries from "@/hooks/useFetchInquiries";

const Dashboard = () => {
  const { data: stats, isLoading: statIsLoading } = useFetchStats();
  const { data: intents } = useFetchIntents(true);
  const { data: feedbacks } = useFetchFeedbacks();
  const { data: inquiries } = useFetchInquiries();

  const colors = ["#facc15", "#4ade80", "#f87171"];

  return (
    <Wrapper norMargin title="Dashboard">
      <div className="flex items-center gap-4 mb-4">
        <StatCard
          title="Knowledge Base"
          value={stats?.models}
          icon={<Bot size={32} />}
          color="bg-blue-500"
          isLoading={statIsLoading}
        />
        <StatCard
          title="Intents"
          value={stats?.intents}
          icon={<FolderKanban size={32} />}
          isLoading={statIsLoading}
        />
        <StatCard
          title="Inquiries"
          value={stats?.inquiries}
          icon={<MessageCircleQuestion size={32} />}
          color="bg-yellow-500"
          isLoading={statIsLoading}
        />
        <StatCard
          title="Feedbacks"
          value={stats?.feedbacks}
          icon={<MessageSquareText size={32} />}
          color="bg-violet-500"
          isLoading={statIsLoading}
        />
      </div>
      <div className="flex gap-4 mb-4">
        <Card className="w-full h-full">
          <CardContent>
            <h1 className="mt-4 mb-2 text-xl text-gray-700 font-semibold text-">
              Inquiries Timeline
            </h1>
            <Separator />
            <ResponsiveContainer height={200}>
              <AreaChart
                margin={{ top: 20 }}
                data={inquiries?.inquiriesByMonth}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* <Card className="mb-4 h-full w-[500px]">
            <CardContent>
              <h1 className="mt-4 mb-2 text-xl text-gray-700 font-semibold text-">
                Overall Sentiment Level
              </h1>
              <Separator />
              <div className="flex items-center gap-10">
                <PieChartWithNeedle
                  data={feedbacks?.sentiment.percentage}
                  colors={colors}
                />
                <div className="flex flex-col text-end">
                  <div className="flex items-center gap-2">
                    <Smile size={50} className="text-slate-500" />
                    <p className="text-3xl font-semibold text-green-400">65%</p>
                  </div>
                  <h2 className="text-lg text-gray-600 mb-2">Out of 50</h2>
                  <div>
                    <p className="bg-green-100 py-1 px-2 inline-block rounded text-lg text-green-500">
                      Positive
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        <Card className="h-full w-[500px]">
          <CardContent>
            <h1 className="mt-4 mb-2 text-xl text-gray-700 font-semibold text-">
              Overall Feedbacks Sentiment
            </h1>
            <Separator />
            <div className="flex items-center gap-10">
              <PieChart width={250} height={200}>
                <Pie
                  data={feedbacks?.sentiment.feedback}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                  paddingAngle={5}
                >
                  <LabelList dataKey="name" className="font-bold fill-black" />
                  {feedbacks?.sentiment.feedback.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Smile size={20} className="text-slate-500" />
                  <p className="text-lg text-green-400">
                    {feedbacks?.sentiment.percentage.positive.toFixed(0) || 0}%
                    <span className="ml-2 text-gray-600 text-base">
                      positive
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Angry size={20} className="text-slate-500" />
                  <p className="text-lg text-red-400">
                    {feedbacks?.sentiment.percentage.negative.toFixed(0) || 0}%
                    <span className="ml-2 text-gray-600 text-base">
                      negative
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Meh size={20} className="text-slate-500" />
                  <p className="text-lg text-yellow-400">
                    {feedbacks?.sentiment.percentage.neutral.toFixed(0) || 0}%
                    <span className="ml-2 text-gray-600 text-base">
                      neutral
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-4 w-full h-full mt-2">
        <CardContent>
          <h1 className="mt-4 mb-2 text-xl text-gray-700 font-semibold text-">
            Inquiry Intent Frequency Overview
          </h1>
          <Separator />
          <ResponsiveContainer height={300}>
            <BarChart margin={{ top: 20 }} data={intents}>
              <defs>
                <linearGradient id="colorCv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tag" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                type="monotone"
                dataKey="frequency"
                stroke="#8884d8"
                // fill="url(#colorCv)"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Dashboard;
