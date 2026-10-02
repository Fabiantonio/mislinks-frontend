export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-12 w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center gap-6 mt-14">
        <div className="w-32 h-32 bg-current opacity-10 rounded-full" />
        <div className="space-y-3 w-full flex flex-col items-center">
          <div className="h-6 bg-current opacity-10 rounded-full w-40" />
          <div className="h-3 bg-current opacity-10 rounded-full w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[68px] rounded-2xl border border-current opacity-10 flex items-center px-3 gap-4"
          >
            <div className="w-11 h-11 bg-current rounded-full" />
            <div className="h-4 bg-current rounded-full w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
