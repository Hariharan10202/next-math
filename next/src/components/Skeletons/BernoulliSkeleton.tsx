import { Skeleton } from "@/components/ui/skeleton";

export default function TwoBarGraphSkeleton() {
  return (
    <div className="flex items-end gap-3 sm:h-[500px] h-[400px] w-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex-1 flex flex-col justify-end">
          <Skeleton
            className={`w-full rounded-sm ${
              // Varying heights for visual realism
              index % 2 === 0 ? "h-32" : "h-64"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
