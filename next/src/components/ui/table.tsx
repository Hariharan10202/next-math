"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const TableWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("relative h-full overflow-auto", className)}
    ref={ref}
    {...props}
  />
));
TableWrapper.displayName = "TableWrapper";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        "[&_tr:first-child]:sticky [&_tr:first-child]:top-0 [&_tr:first-child]:z-10 [&_tr:first-child]:bg-header-background",
        className
      )}
      {...props}
    />
  );
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr>td]:border-b-2", className)}
      {...props}
    />
  );
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  type?: string;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ",
          type === "actions" &&
            "[&_td:last-child]:sticky [&_td:last-child]:right-0 [&_td:last-child]:bg-white-900 [&_td:nth-last-child(1)]:sticky [&_td:nth-last-child(1)]:right-0 [&_td:nth-last-child(1)]:bg-white-900 [&_th:last-child]:sticky [&_th:last-child]:right-0 [&_th:nth-last-child(1)]:sticky [&_th:nth-last-child(1)]:right-0 ",
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "z-[4] h-[20px] bg-sidebar px-4 py-4 text-left font-medium text-primary [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 text-left font-medium [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
TableCaption.displayName = "TableCaption";

export {
  TableWrapper,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
