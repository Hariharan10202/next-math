"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { itemsPerPage } from "@/lib/contants";
import { FileUploadResponse } from "@/schemas/output/root";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import Pagination from "../PaginationWindow";
import { Skeleton } from "../ui/skeleton";

interface TableDataProps {
  data?: FileUploadResponse;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  isLoading: boolean;
  fileName?: string;
}

export function DataTable({
  data,
  currentPage,
  setCurrentPage,
  isLoading,
  fileName,
}: TableDataProps) {
  const columns = useMemo<
    ColumnDef<FileUploadResponse["data"][number]>[]
  >(() => {
    if (!data?.columns?.length) return [];

    return data.columns.map((column) => ({
      accessorKey: column,
      header: () => (
        <div className="font-semibold capitalize px-4 py-3">{column}</div>
      ),
      cell: ({ row }) => {
        const value = row.original[column];

        return (
          <>
            {isLoading ? (
              <Skeleton className="w-[200px] rounded-xl h-5"></Skeleton>
            ) : (
              <div className="max-w-lg truncate px-4 py-3">
                {value instanceof Date ? value.toLocaleString() : value ?? "-"}
              </div>
            )}
          </>
        );
      },
    }));
  }, [data, isLoading]);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data?.columns) {
    return (
      <div className="py-10 text-center">
        <p>No data found</p>
        <p>Please upload .csv/xlsx</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border w-full flex flex-col">
      <div className="p-5 flex justify-start">
        <h2>{fileName}</h2>
      </div>
      <div className="h-[800px] w-full overflow-y-scroll">
        <Table className="overflow-y-scroll">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex overflow-x-scroll justify-end">
        <Pagination
          className="flex items-center p-6"
          itemsPerPage={itemsPerPage}
          totalItems={data?.pagination.total_rows ?? 0}
          page={currentPage}
          onPageChange={(e) => setCurrentPage(e)}
        />
      </div>
    </div>
  );
}
