export default function MessageLoader() {
  return (
    <div className="h-full w-full flex flex-col bg-white rounded-xl">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Received Message */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="flex flex-col gap-2 max-w-[70%]">
            <div className="h-16 bg-gray-200 rounded-2xl rounded-tl-none animate-pulse w-64" />
            <div className="h-12 bg-gray-200 rounded-2xl rounded-tl-none animate-pulse w-48" />
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex items-start gap-2 justify-end">
          <div className="flex flex-col gap-2 max-w-[70%] items-end">
            <div className="h-14 bg-blue-100 rounded-2xl rounded-tr-none animate-pulse w-56" />
            <div className="h-10 bg-blue-100 rounded-2xl rounded-tr-none animate-pulse w-40" />
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-200 animate-pulse flex-shrink-0" />
        </div>

        {/* Received Message */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="flex flex-col gap-2 max-w-[70%]">
            <div className="h-20 bg-gray-200 rounded-2xl rounded-tl-none animate-pulse w-72" />
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex items-start gap-2 justify-end">
          <div className="flex flex-col gap-2 max-w-[70%] items-end">
            <div className="h-12 bg-blue-100 rounded-2xl rounded-tr-none animate-pulse w-52" />
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-200 animate-pulse flex-shrink-0" />
        </div>
      </div>

      {/* Input Area Skeleton */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}