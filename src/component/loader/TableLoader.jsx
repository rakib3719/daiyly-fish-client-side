

const TableLoader = () => {
  return (
    <div className="flex flex-col space-y-4 justify-center mt-28 items-center" >
      {/* Table header skeleton */}
      <div className="flex space-x-4 animate-pulse">
        <div className="bg-gray-300 h-6 w-32 rounded"></div>
        <div className="bg-gray-300 h-6 w-32 rounded"></div>
        <div className="bg-gray-300 h-6 w-32 rounded"></div>
        <div className="bg-gray-300 h-6 w-32 rounded"></div>
      </div>
      {/* Table row skeleton */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex space-x-4 animate-pulse">
          <div className="bg-gray-300 h-6 w-32 rounded"></div>
          <div className="bg-gray-300 h-6 w-32 rounded"></div>
          <div className="bg-gray-300 h-6 w-32 rounded"></div>
          <div className="bg-gray-300 h-6 w-32 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default TableLoader ;
