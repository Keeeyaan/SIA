import { ColumnDef } from "@tanstack/react-table";

interface IInquiry {
  _id: string;
  inquiry: string;
  tag: string;
}

export const columns: ColumnDef<IInquiry>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "inquiry",
    header: "Inquiry",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
];
