export const UserProfileSkeleton = ()=>{
   return (
    <>
<div className="min-h-screen bg-zinc-900 text-zinc-100 mt-20 font-display">
  <div className="max-w-4xl mx-auto px-4 py-5 space-y-8">
    
    <div className="relative">
      <div className="absolute inset-0 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10 animate-shimmer" />
      <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-8 pt-8 px-6">
        <div className="w-32 h-32  rounded-full bg-zinc-700 animate-pulse" />
        <div className="flex flex-col items-center md:items-start space-y-4 w-full">
          <div className="h-6 w-3/4 bg-zinc-700 rounded-md animate-pulse" />
          <div className="w-1/3 h-8 bg-zinc-700 rounded-md animate-pulse" />
        </div>
      </div>
    </div>

    <div className="flex justify-center space-x-4">
      <div className="p-3 w-10 h-10 bg-zinc-800 rounded-lg animate-pulse" />
      <div className="p-3 w-10 h-10 bg-zinc-800 rounded-lg animate-pulse" />
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 flex items-center space-x-4 animate-pulse">
        <div className="p-3 bg-zinc-700/50 rounded-lg w-12 h-12" />
        <div className="w-2/3">
          <div className="h-4 bg-zinc-700 rounded-md mb-2" />
          <div className="h-4 bg-zinc-700 rounded-md" />
        </div>
      </div>
      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 flex items-center space-x-4 animate-pulse">
        <div className="p-3 bg-zinc-700/50 rounded-lg w-12 h-12" />
        <div className="w-2/3">
          <div className="h-4 bg-zinc-700 rounded-md mb-2" />
          <div className="h-4 bg-zinc-700 rounded-md" />
        </div>
      </div>
    </div>

    {/* About Me Skeleton */}
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-4 animate-pulse">
      <div className="h-5 bg-zinc-700 rounded-md w-1/4" />
      <div className="space-y-2">
        <div className="h-4 bg-zinc-700 rounded-md w-full" />
        <div className="h-4 bg-zinc-700 rounded-md w-3/4" />
      </div>
    </div>

    {/* Tech Stack Skeleton */}
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-4 animate-pulse">
      <div className="h-5 bg-zinc-700 rounded-md w-1/4" />
      <div className="flex flex-wrap gap-2">
        {Array(4).fill().map((_, index) => (
          <div key={index} className="w-16 h-6 bg-zinc-700 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>

    {/* Blogs Skeleton */}
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-4 animate-pulse">
      <div className="h-5 bg-zinc-700 rounded-md w-1/4" />
      <div className="space-y-4">
        {Array(3).fill().map((_, index) => (
          <div key={index} className="h-4 bg-zinc-700 rounded-md w-3/4 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
</div>


    </>

   )
}
