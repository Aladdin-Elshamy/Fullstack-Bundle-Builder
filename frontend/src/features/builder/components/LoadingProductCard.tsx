import { Card, CardContent, CardFooter } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";
import { cn } from "#lib/utils";
import type { LoadingProductCardProps } from "../types";

export default function LoadingProductCard({
  isLastAndOdd,
}: LoadingProductCardProps) {
  return (
    <Card
      aria-hidden="true"
      className={cn(
        "w-full sm:max-w-70 xl:max-w-full rounded-2xl overflow-hidden p-0 gap-0 flex flex-col xl:flex-row items-start border",
        isLastAndOdd && "mx-auto w-fit last:xl:col-span-2",
      )}
    >
      {/* ── Image zone ── */}
      <div className="relative overflow-hidden flex items-center justify-center h-80 w-full xl:w-1/2 xl:min-h-full bg-white/50">
        <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full" />
        <Skeleton className="h-40 w-40 rounded-2xl" />
      </div>

      {/* Info zone */}
      <div className="flex flex-col w-full">
        <CardContent className="px-2.5 sm:pt-4 pb-2.5">
          {/* Brand + name */}
          <div className="min-w-0 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-full max-w-sm" />
              <Skeleton className="h-4 w-11/12 max-w-sm" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Variant chips */}
          <div className="flex flex-wrap gap-1.5 pt-2.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="basis-20 flex justify-around items-center rounded-xs h-10 border shrink-0 px-1.5"
              >
                <Skeleton className="w-7 h-7 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </CardContent>

        {/* Action zone */}
        <CardFooter className="px-2.5 pb-2.5 gap-2 bg-transparent justify-between border-t-0 flex-wrap">
          {/* Counter */}
          <div className="flex items-start gap-1">
            <Skeleton className="w-7 h-7 rounded-md" />
            <Skeleton className="w-5 h-7 rounded-md" />
            <Skeleton className="w-7 h-7 rounded-md" />
          </div>

          {/* Price */}
          <div className="flex items-center flex-col pt-1 gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-14" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}