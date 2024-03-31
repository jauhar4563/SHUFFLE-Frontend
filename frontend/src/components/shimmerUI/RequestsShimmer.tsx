
function RequestsShimmer() {
  return (
    <div className="lg:col-span-2 ms-96 w-12/12 pl-3 pb-2" id="posted">
      <div className="flex justify-between bg-white p-2 ml-2 rounded-lg" style={{width:"660px"}}>
        <div className="info flex items-center">
          <div className="h-full bg-gray-200 animate-pulse w-1 mr-3"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 w-24 rounded-md ml-2"></div>
          <div className="h-4 bg-gray-200 w-4 rounded-full mx-1"></div>
          <div className="h-4 bg-gray-200 w-16 rounded-md"></div>
        </div>
        <div className="items-center flex gap-5 actions">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default RequestsShimmer;
