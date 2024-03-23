import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

interface IAdmins {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export const columns: ColumnDef<IAdmins>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("created_at"), "MMMM dd, yyyy");
      return formattedDate;
    },
  },
];
