const PostShimmer = () => {
  return (
    <div className="ms-96 pt-4">

    <div className="animate-pulse ml-5 bg-gray-200 rounded-lg p-6 mb-1 max-w-full">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="flex items-center">
          <div className="h-4 w-20 bg-gray-300 ml-2"></div>
          <div className="h-4 w-4 bg-gray-300 rounded-full ml-2"></div>
          <div className="h-4 w-4 bg-gray-300 ml-1"></div>
          <div className="h-4 w-12 bg-gray-300 ml-1"></div>
        </div>
      </div>
      <div className="h-4 w-4 bg-gray-300"></div>
    </div>
    <div className="mb-1 mt-2">
      <div className="h-4 w-full bg-gray-300"></div>
    </div>
    <div className="mb-3">
      <div className="h-4 w-full bg-gray-300"></div>
    </div>
    <div className="mb-4" >
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 bg-gray-300"></div>
    </div>
    <div className="flex items-center justify-between text-gray-500">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-300 mt-1"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-300 mt-1"></div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default PostShimmer;
