import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PendingRow from "./PendingRow";
import { ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import ColorLoader from "../../../component/loader/ColorLoader";

const PendingOrder = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['getOrderData'],
    enabled: !!user,
    queryFn: async () => {
      const response = await axiosSecure.get(`orderInfo`);
      return response.data;
    }
  });

  if (isLoading) {
    return <ColorLoader></ColorLoader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full table-sm bg-white rounded-lg shadow-md">
          <thead className="bg-[#126456] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3  text-left hidden md:block">Invoice</th>
              <th className="p-3 text-left">Name</th>
             
              <th className="p-3 text-left">View Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, idx) => (
              <PendingRow key={data._id} refetch={refetch} idx={idx} data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrder;
