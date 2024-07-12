export function ProfileSkeleton() {
    const shimmerClass = "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

    return (
        <div className="w-full h-full p-10 pl-5 pr-5 font-display mt-16 md:p-16">
            <div className="space-y-8 max-w-4xl lg:flex-row lg:justify-center lg:items-center mx-auto">
                <div className="w-full h-fit space-y-3 md:flex">
                    <div className="md:flex md:items-center md:space-x-3 w-full">
                        <div className={ `w-28 md:w-32 h-28 mb-2 rounded-full ${shimmerClass}`} />
                        <div className="lg:flex lg:justify-between w-full space-y-3 lg:space-y-0">
                            <div className={`h-8 w-48 ${shimmerClass}`} />
                            <div className={`h-10 w-24 ${shimmerClass}`} />
                        </div>
                    </div>
                </div>

                <div className="w-full border-4 border-gray-200 rounded-lg p-6 space-y-3">
                    <div className="space-x-2 flex">
                        <div className={`w-8 h-8 rounded-full ${shimmerClass}`} />
                        <div className={`w-8 h-8 rounded-full ${shimmerClass}`} />
                    </div>
                    <div className="space-x-2 p-1 flex">
                        <div className={`w-6 h-6 ${shimmerClass}`} />
                        <div className={`h-6 w-40 ${shimmerClass}`} />
                    </div>
                </div>

                <div className="w-full h-fit">
                    <div className="border-4 border-gray-200 p-6 mb-3 rounded-lg min-h-44">
                        <div className={`h-6 w-32 mb-2 ${shimmerClass}`} />
                        <div className={`h-4 w-full ${shimmerClass} mb-2`} />
                        <div className={`h-4 w-3/4 ${shimmerClass}`} />
                    </div>

                    <div className="border-4 border-gray-200 p-6 mb-3 rounded-lg min-h-44">
                        <div className={`h-6 w-40 mb-2 ${shimmerClass}`} />
                        <div className="flex flex-wrap">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div key={index} className={`w-20 h-8 m-1 rounded-2xl ${shimmerClass}`} />
                            ))}
                        </div>
                    </div>

                    <div className="border-4 border-gray-200 p-6 mb-3 rounded-lg min-h-44">
                        <div className={`h-6 w-24 mb-2 ${shimmerClass}`} />
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="mb-2">
                                <div className={`h-4 w-3/4 ${shimmerClass} mb-1`} />
                                <div className={`h-4 w-1/2 ${shimmerClass}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}