import { AlertCircle } from "lucide-react";

import useFetchFeedbacks from "@/hooks/useFetchFeedbacks";
// import TableSkeletonCard from "./TableSkeletonCard";
import DataTable from "./DataTable";
import { columns } from "./columns";

const FeedbackTable = () => {
  const { data: feedbacks, isLoading, isError } = useFetchFeedbacks();

  return (
    <>
      {isLoading ? (
        <div>
          <p>Loading..</p>
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2 text-red-500  justify-center">
          <AlertCircle />
          <p>Something went wrong!</p>
        </div>
      ) : (
        <DataTable columns={columns} data={feedbacks!} />
      )}
    </>
  );
};

export default FeedbackTable;
