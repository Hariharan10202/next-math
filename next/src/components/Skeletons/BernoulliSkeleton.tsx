import { Skeleton } from "@/components/ui/skeleton";

export default function TwoBarGraphSkeleton() {
  return (
    <div className="flex items-end gap-4 h-48 w-full">
      <div className="flex-1 flex flex-col justify-end">
        <Skeleton className="w-full h-32 rounded-sm" />
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Label 1
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <Skeleton className="w-full h-64 rounded-sm" />
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Label 2
        </div>
      </div>
    </div>
  );
}
