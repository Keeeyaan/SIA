import { AlertCircle } from "lucide-react";

import useFetchInquiries from "@/hooks/useFetchInquiries";
// import TableSkeletonCard from "./TableSkeletonCard";
import DataTable from "./DataTable";
import { columns } from "./columns";

const InquriesTable = () => {
  const { data: inquries, isLoading, isError } = useFetchInquiries();

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        <DataTable columns={columns} data={inquries?.data!} />
      )}
    </>
  );
};

export default InquriesTable;
