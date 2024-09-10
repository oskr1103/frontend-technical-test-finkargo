const SkeletonCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <div
        data-testid="image-placeholder"
        className="w-full h-48 bg-gray-200 animate-pulse"
      ></div>
      <div className="p-4">
        <div
          data-testid="text-placeholder-1"
          className="h-4 bg-gray-200 animate-pulse mb-2"
        ></div>
        <div
          data-testid="text-placeholder-2"
          className="h-4 bg-gray-200 animate-pulse mb-2"
        ></div>
        <div
          data-testid="text-placeholder-3"
          className="h-4 bg-gray-200 animate-pulse"
        ></div>
      </div>
    </div>
  )
}

export default SkeletonCard
