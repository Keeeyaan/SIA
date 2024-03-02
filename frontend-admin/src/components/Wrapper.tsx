import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

const Wrapper = ({
  className,
  title,
  norMargin,
  children,
}: {
  className?: string;
  title?: string;
  norMargin?: boolean;
  children: ReactNode;
}) => {
  useEffect(() => {
    document.title = `Guide Bot Admin | ${title || ""}`;
    window.scroll(0, 0);
  }, [title]);

  return (
    <main
      className={cn(
        `${
          norMargin ? "md:px-10" : "md:px-40"
        } w-full mx-auto px-4  max-screen-xl`,
        className
      )}
    >
      {children}
    </main>
  );
};

export default Wrapper;
