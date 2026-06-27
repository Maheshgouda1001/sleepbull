export default function ProductSkeleton() {
    return (
      <div className="overflow-hidden rounded-3xl border bg-white">
  
        <div className="aspect-square animate-pulse bg-slate-200" />
  
        <div className="space-y-4 p-6">
  
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
  
          <div className="h-6 w-full animate-pulse rounded bg-slate-200" />
  
          <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
  
          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
  
        </div>
  
      </div>
    );
  }