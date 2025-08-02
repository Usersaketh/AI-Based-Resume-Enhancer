import { Skeleton } from "@/components/ui/skeleton"

export const FormSkeleton = () => (
  <div className="space-y-6 p-4">
    <Skeleton className="h-8 w-48" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-4 w-32 sm:w-24" />
          <Skeleton className="h-10 w-full sm:flex-1" />
        </div>
      ))}
    </div>
  </div>
);

export const SuggestionsSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-4 border border-neutral-700 rounded-lg">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    ))}
  </div>
);

export const TemplatesSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border border-neutral-700 rounded-lg overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <div className="p-4">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    ))}
  </div>
);
