import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/tailwind";

interface CatalogSkeeletonParams {
  skeletonsCount: number;
}

export const CatalogSkeleton = ({ skeletonsCount }: CatalogSkeeletonParams) => (
  <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6">
    {Array.from({ length: skeletonsCount }, (_, index) => index).map((card) => (
      <article
        key={card}
        className={cn(
          "flex min-w-0 flex-col gap-2",
          card >= 4 && "hidden lg:flex",
        )}
      >
        <Skeleton className="h-39.5 w-full rounded-24" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-2/5 rounded-24" />
          <Skeleton className="h-4 w-2/3 rounded-24 bg-muted-fg/20" />
        </div>
      </article>
    ))}
  </div>
);
