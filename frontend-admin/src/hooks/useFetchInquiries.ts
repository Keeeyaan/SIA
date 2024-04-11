import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { getAllInquiries } from "@/api/inquiries";

interface MonthlyInquiry {
  month: string;
  count: number;
}
const useFetchInquiries = () => {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: getAllInquiries,
    select: (data) => {
      const inquiriesByMonth: MonthlyInquiry[] = [];
      const monthsMap: { [month: string]: number } = {};

      data.forEach((inquiry) => {
        const month = format(new Date(inquiry.created_at), "MMMM");
        if (!monthsMap[month]) {
          monthsMap[month] = 0;
        }
        monthsMap[month]++;
      });

      // Convert map to array of MonthlyInquiry objects
      Object.keys(monthsMap).forEach((month) => {
        inquiriesByMonth.push({ month, count: monthsMap[month] });
      });

      const newData = { data, inquiriesByMonth };
      return newData;
    },
  });
};

export default useFetchInquiries;
