import { useQuery } from "@tanstack/react-query";

import { getAllInquiries } from "@/api/inquiries";

const useFetchInquiries = () => {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: getAllInquiries,
  });
};

export default useFetchInquiries;
