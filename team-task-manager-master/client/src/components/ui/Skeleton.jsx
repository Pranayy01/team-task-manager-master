export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-[linear-gradient(110deg,rgba(148,163,184,0.18),rgba(255,255,255,0.38),rgba(148,163,184,0.18))] bg-[length:700px_100%] dark:bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0.16),rgba(255,255,255,0.06))] ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.07]">
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

export function TaskSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.07]">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="hidden h-8 w-24 sm:block" />
    </div>
  );
}
