import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import DeleveryRow from "./DeleveryRow";


const PendingDelevery = () => {

const axiosSecure = useAxiosSecure()
const{ user} = useContext(AuthContext)

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['getOrderData'],
        enabled: !!user,
        queryFn: async () => {
          const response = await axiosSecure.get(`pendeingDelevery`);
          return response.data;
        }
      });
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
      console.log(data);
    
    return (
        <div className="p-4">
        <ToastContainer />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[#126456] text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 hidden md:block text-left">Invoice</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 hidden md:block  text-left">Mobile Number</th>
                <th className="p-3 text-left"> Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, idx) => (
                <DeleveryRow key={data._id} refetch={refetch} idx={idx} data={data} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PendingDelevery;