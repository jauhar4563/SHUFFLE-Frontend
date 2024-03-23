import React from "react";

function PostShimmer() {
  return (
    <div className="lg:col-span-2 ms-96 w-96 p-4 " id="posted">
      <div className="flex flex-col">
        <div className="bg-white p-6 mb-4 rounded-lg shadow-md max-w-full animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="bg-gray-200 h-5 w-20 rounded-md" />
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-gray-200 h-64 rounded-md" />
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 h-5 w-16 rounded-md" />
              <div className="bg-gray-200 h-5 w-16 rounded-md" />
              <div className="bg-gray-200 h-5 w-16 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostShimmer;
