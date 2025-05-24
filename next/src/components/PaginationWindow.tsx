import { cn } from "@/lib/utils";
import {
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  Pagination as PaginationMain,
  PaginationFirst,
  PaginationLast,
} from "./ui/pagination";

interface PaginationProps {
  className?: string;
  isLoading?: boolean;
  itemsPerPage: number;
  totalItems: number;
  page: number;
  onPageChange: (e: number) => void;
}

const Pagination = ({
  className,
  isLoading,
  itemsPerPage,
  totalItems,
  page,
  onPageChange,
}: PaginationProps) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const lastPage = totalPages - 2;
  const maxButtonsToShow = page > 3 ? (page < lastPage ? 3 : 5) : 5;

  const buttons = [];

  const handleFirst = () => {
    if (page > 0) {
      onPageChange(0);
    }
  };
  const handlePrevious = () => {
    if (page > 0) {
      onPageChange(Math.min(1, page - 1));
    }
  };
  const handleNext = () => {
    if (page < totalPages - 1) {
      onPageChange(Math.min(totalPages, page + 1));
    }
  };
  const handleLast = () => {
    if (page < totalPages - 1) {
      onPageChange(totalPages - 1);
    }
  };

  let startPage, endPage;

  if (totalPages <= maxButtonsToShow) {
    startPage = 1;
    endPage = totalPages;
  } else if (page <= Math.ceil(maxButtonsToShow / 2)) {
    startPage = 1;
    endPage = maxButtonsToShow;
  } else if (page >= totalPages - Math.floor(maxButtonsToShow / 2)) {
    startPage = totalPages - maxButtonsToShow + 1;
    endPage = totalPages;
  } else {
    startPage = page - Math.floor(maxButtonsToShow / 2) + 1;
    endPage = page + Math.ceil(maxButtonsToShow / 2);
  }

  if (startPage > 1) {
    buttons.push(
      <PaginationItem key={1}>
        <PaginationLink key={1} onClick={() => onPageChange(0)}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (startPage > 2) {
      buttons.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <PaginationItem key={i}>
        <PaginationLink
          isActive={page === i - 1}
          onClick={() => onPageChange(i - 1)}
          className="cursor-pointer"
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (endPage < totalPages) {
    if (totalPages - endPage > 1) {
      buttons.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    buttons.push(
      <PaginationItem key={totalPages}>
        <PaginationLink onClick={() => onPageChange(totalPages - 1)}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (!totalPages) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <PaginationMain className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            onClick={handleFirst}
            className={cn({
              "cursor-pointer px-0": page !== 0,
              "cursor-not-allowed px-0": page === 0,
            })}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={cn({
              "cursor-pointer": page !== 0,
              "cursor-not-allowed": page === 0,
            })}
          />
        </PaginationItem>
        {buttons}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={cn({
              "cursor-pointer": page !== totalPages - 1,
              "cursor-not-allowed": page === totalPages - 1,
            })}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            onClick={handleLast}
            className={cn({
              "cursor-pointer": page !== totalPages - 1,
              "cursor-not-allowed": page === totalPages - 1,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationMain>
  );
};

export default Pagination;
