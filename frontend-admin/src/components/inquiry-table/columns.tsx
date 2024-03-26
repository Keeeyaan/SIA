import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import InquiryTableAction from "./InquiryTableAction";

interface IInquiry {
  _id: string;
  token: string;
  inquiry: string;
  tag: string;
  created_at: Date;
}

export const columns: ColumnDef<IInquiry>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "token",
    header: "Token",
  },
  {
    accessorKey: "inquiry",
    header: "Inquiry",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("created_at"), "MMMM dd, yyyy");
      return formattedDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <InquiryTableAction inquiry={row.original} />;
    },
  },
];
