import { Skeleton } from "@/components/ui/skeleton"

export default function MatchesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-8 w-16" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-8" />
          </div>
        </div>
      ))}
    </div>
  )
}
