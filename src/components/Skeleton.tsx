export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-12 w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 bg-slate-200 rounded-full shadow-sm" />
        <div className="space-y-3 w-full flex flex-col items-center">
          <div className="h-6 bg-slate-200 rounded-full w-32" />
          <div className="h-4 bg-slate-200 rounded-full w-48" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="h-16 bg-slate-100 rounded-2xl border border-slate-200 flex items-center px-4 gap-4"
          >
            <div className="w-10 h-10 bg-slate-200 rounded-xl" />
            <div className="h-4 bg-slate-200 rounded-full w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}