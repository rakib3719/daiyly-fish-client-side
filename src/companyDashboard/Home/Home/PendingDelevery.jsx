import { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import DeleveryRow from "./DeleveryRow";
import ColorLoader from "../../../component/loader/ColorLoader";

const PendingDelevery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [filterStatus, setFilterStatus] = useState('confirmed'); // State for filtering
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [limit, setLimit] = useState(10); // Track the limit (number of items per page)

  // Fetch the delivery data with pagination
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['getOrderData', filterStatus, currentPage, limit],
    enabled: !!user,
    queryFn: async () => {
      const response = await axiosSecure.get(`/pendeingDelevery?filter=${filterStatus}&page=${currentPage}&limit=${limit}`);
      return response.data;
    }
  });

  const { data: count } = useQuery({
    queryKey: ['deleveryInfo'],
    queryFn: async () => {
      const data = await axiosSecure.get(`/totalPendingDelevery`);
      return data;
    }
  });

  const totalOrder = data?.totalCount || 0; // Get total count of orders for pagination
  const totalPages = Math.ceil(totalOrder / limit); // Calculate total pages

  if (isLoading) {
    return <ColorLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by Status:</label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); // Reset to the first page when filter changes
          }}
          className="px-4 py-2 border rounded-md"
        >
          <option value="confirmed"> Order Confirmed</option>
          <option value="courier"> Order on the Courier</option>
          <option value="done">Delevery Done</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-[#126456] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 hidden md:block text-left">Invoice</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 hidden md:block text-left">Mobile Number</th>
              <th className="p-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((order, idx) => (
              <DeleveryRow key={order._id} refetch={refetch} idx={idx + 1 + (currentPage - 1) * limit} data={order} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mx-auto mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="join-item btn btn-outline"
        >
          Previous page
        </button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={idx + 1 === currentPage ? "join-item btn bg-[#aa1936] hover:bg-[#aa1936] text-white" : "join-item btn hover:bg-[#aa1936] hover:text-white"}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="join-item btn btn-outline"
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default PendingDelevery;
