function CardSkeleton() {

  return (
    <div className="bg-zinc-900/50 w-full p-4 rounded-xl overflow-hidden animate-shimmer space-y-2 bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]">
      <div className="w-full h-40 sm:h-80 md:h-96  rounded-2xl animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]" />
      <div className="animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] py-3 rounded-md"></div>
      <div className="animate-shimmer bg-gradient-to-r from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%] py-3 rounded-md"></div>
    </div>
  );
};


export default CardSkeleton;