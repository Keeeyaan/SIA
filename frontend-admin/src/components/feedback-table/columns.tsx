import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import FeedbackTableAction from "./FeedbackTableAction";

interface IFeedback {
  _id: string;
  sequence: { inquiry: string; response: string; createdAt: string };
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
    accessorKey: "sequence.inquiry",
    header: "Inquiry",
  },
  {
    accessorKey: "sequence.response",
    header: "Response",
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
  {
    id: "actions",
    cell: ({ row }) => {
      return <FeedbackTableAction feedback={row.original} />;
    },
  },
];
