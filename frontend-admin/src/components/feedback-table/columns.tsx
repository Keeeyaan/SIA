import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

interface IFeedback {
  _id: string;
  sequence: [];
  comment: string;
  sentiment: string;
  created_at: Date;
}

export const columns: ColumnDef<IFeedback>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
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
