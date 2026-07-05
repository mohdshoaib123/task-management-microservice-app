const Loading = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl bg-white p-8 shadow-xl">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      <p className="text-sm font-medium text-slate-700">{message}</p>
    </div>
  )
}

export default Loading
