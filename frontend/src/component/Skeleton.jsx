export function SkeletonLoad() {
    const shimmerClass = "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";
    
    return (
       <div className="lg:flex lg:justify-center lg:items-center md:p-12 md:pt-0 min-h-screen mt-16 overflow-hidden w-full">
          <div className="font-display p-6 w-full max-w-[900px]">
            <div className="space-y-3 mb-4 w-full">
              <div className="w-full bg-gray-200 overflow-hidden">
                <div className={`aspect-video w-full ${shimmerClass}`} />
              </div>
              <div className={`h-8 w-full rounded-sm ${shimmerClass}`} />
              <div className="flex items-center cursor-pointer">
                <div className={`mr-2 w-12 h-12 rounded-full ${shimmerClass}`} />
                <div className="space-y-2">
                  <div className={`h-4 w-32 ${shimmerClass}`} />
                  <div className={`h-4 w-24 ${shimmerClass}`} />
                </div>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
              <div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
<div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
<div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
<div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
<div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
<div className={`h-4 w-full rounded-sm ${shimmerClass}`} />
              <div className={`h-4 w-3/4 rounded-sm ${shimmerClass}`} />
            </div>
          </div>
        </div> 
    );
}