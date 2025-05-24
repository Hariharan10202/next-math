import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {Array.from({ length: 5 }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b">
              {Array.from({ length: 5 }).map((_, colIdx) => (
                <td key={colIdx} className="px-6 py-4">
                  <Skeleton className="h-4 w-full max-w-[120px]" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
