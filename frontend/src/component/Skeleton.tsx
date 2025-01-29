export function SkeletonLoad() {

  return (
    <div className="min-h-screen mt-14">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 mb-8">
          <div className="h-8 md:h-10 rounded-lg animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] w-3/4" />
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            <div className="w-full aspect-video animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]" />
          </div>
          <div className="flex items-center space-x-4 border-b border-slate-700 pb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-full animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]" />
            </div>
            <div className="flex-1">
              <div className="h-6 rounded animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] w-32 mb-2" />
              <div className="flex items-center space-x-4">
                <div className="h-4 rounded animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] w-24" />
              </div>
            </div>
          </div>
        </div>
        <article className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="py-3 rounded-md animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]" />
              <div className="py-3 rounded-md animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] w-11/12" />
              <div className="py-3 rounded-md animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] w-4/5" />
            </div>
          ))}
        </article>
      </div>
    </div>
  );
};

