import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import TableAction from "./TableAction";

const SkeletonCard = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

const TablePTRP = ({
  PTRP,
  isLoadingPTRP,
  itemHead,
  caption,
  tag,
  noAction,
}: {
  PTRP?: string[];
  isLoadingPTRP: boolean;
  itemHead: string;
  caption: string;
  tag: string;
  noAction?: boolean;
}) => {
  return (
    <>
      {isLoadingPTRP ? (
        <SkeletonCard />
      ) : (
        <Table>
          <TableCaption>{caption}.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{itemHead}</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PTRP?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>
                    {itemHead === "Pattern" ? (
                      item
                    ) : (
                      <ReactMarkDown
                        rehypePlugins={[remarkGfm]}
                        className="markdown"
                        children={item}
                      />
                    )}
                  </TableCell>
                  {!noAction && (
                    <TableCell>
                      <TableAction
                        tag={tag}
                        item={item}
                        id={index}
                        itemHead={itemHead}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TablePTRP;
