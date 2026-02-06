

export default function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      {children}
    </div>
  )
}
