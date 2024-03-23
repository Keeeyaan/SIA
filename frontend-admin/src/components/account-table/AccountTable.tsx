import { AlertCircle } from "lucide-react";

import useFetchAdmins from "@/hooks/useFetchAdmins";
// import TableSkeletonCard from "./TableSkeletonCard";
import DataTable from "./DataTable";
import { columns } from "./columns";

const AccountTable = () => {
  const { data: accounts, isLoading, isError } = useFetchAdmins();

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
        <DataTable columns={columns} data={accounts!} />
      )}
    </>
  );
};

export default AccountTable;
