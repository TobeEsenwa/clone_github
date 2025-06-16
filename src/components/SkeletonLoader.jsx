function SkeletonLoader() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        </div>
        
        <div className="flex-grow">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="h-5 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;