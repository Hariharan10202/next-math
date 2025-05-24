import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("w-fit select-none", className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("flex", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-fit w-fit px-2 py-[2px] min-h-9 min-w-9 flex-col items-center justify-center gap-2.5 rounded-lg border border-input  !transition-none",
        className,
        isActive
          ? "bg-white text-background"
          : "text-foreground hover:bg-primary-foreground/20 hover:text-foreground"
      )}
      {...props}
    />
  );
};

PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("!px-2.5", className)}
    {...props}
  >
    <ChevronLeft width={16} height={16} />
  </PaginationLink>
);

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={cn("hidden !px-2.5 sm:flex", className)}
    {...props}
  >
    <ChevronsLeft width={16} height={16} />
  </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    className={cn("hidden !px-2.5 sm:flex", className)}
    {...props}
  >
    <ChevronsRight width={16} height={16} />
  </PaginationLink>
);

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    style={{ padding: "0px 10px" }}
    className={cn("gap-1 ", className)}
    {...props}
  >
    <ChevronRight width={16} height={16} />
  </PaginationLink>
);

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal />
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationLast,
  PaginationFirst,
  PaginationNext,
  PaginationPrevious,
};
