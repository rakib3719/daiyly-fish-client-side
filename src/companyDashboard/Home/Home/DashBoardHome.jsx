
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DashBoardHome = () => {
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const {data:pendingOrder, isLoading: pendingLoader} = useQuery({

    queryKey: "pendingOrder",
    queryFn: async ()=>{

const count = await axiosSecure.get('/pendingCount');
return count;
    }
  })
  const {data:doneOrder, isLoading: doneLoader} = useQuery({

    queryKey: "doneOrder",
    queryFn: async ()=>{

const count = await axiosSecure.get('/doneCount');
return count;
    }
  })
  const {data:totalFish, isLoading: fishLoader} = useQuery({

    queryKey: "countFish",
    queryFn: async ()=>{

const count = await axiosSecure.get('/countFish');
return count;
    }
  })
  const {data:courier, isLoading: courierLoader} = useQuery({

    queryKey: "countFish",
    queryFn: async ()=>{

const count = await axiosSecure.get('/courier');
return count;
    }
  })
  const {data:confirmed, isLoading: confirmedLoader} = useQuery({

    queryKey: "countFish",
    queryFn: async ()=>{

const count = await axiosSecure.get('/courier');
return count;
    }
  })

  console.log(pendingOrder,"pending");
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Pending Orders */}
        <div 
          className="p-6 rounded-lg shadow-2xl bg-gradient-to-r from-red-400 to-red-600 text-white transform hover:scale-105 transition-transform"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Pending Orders</h2>
              <p className="text-white mt-2">Total orders pending for approval</p>
            </div>
            <div className="text-4xl font-semibold">
          {
            pendingLoader? "..." : pendingOrder?.data?.count
          }
            </div>
          </div>
        </div>

        {/* Total Deliveries */}
        <div 
          className="p-6 rounded-lg shadow-2xl bg-gradient-to-r from-green-400 to-green-600 text-white transform hover:scale-105 transition-transform"
          data-aos="fade-up" data-aos-delay="100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold"> Complate Deliveries</h2>
              <p className="text-white mt-2">Total successful deliveries</p>
            </div>
            <div className="text-4xl font-semibold">
            
               {
                doneLoader? "..." : doneOrder?.data?.count
              }
            
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div 
          className="p-6 rounded-lg shadow-2xl bg-gradient-to-r from-blue-400 to-blue-600 text-white transform hover:scale-105 transition-transform"
          data-aos="fade-up" data-aos-delay="200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Products</h2>
              <p className="text-white mt-2">Total available products</p>
            </div>
            <div className="text-4xl font-semibold">
            {
         fishLoader ? "..." : totalFish?.data?.count
          }
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div 
          className="p-6 rounded-lg shadow-2xl bg-gradient-to-r from-indigo-400 to-indigo-600 text-white transform hover:scale-105 transition-transform"
          data-aos="fade-up" data-aos-delay="300"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">On The Curier</h2>
              <p className="text-white mt-2">Total revenue generated</p>
            </div>
            <div className="text-4xl font-semibold">
       {courierLoader ? "..." : courier?.data?.count}
            </div>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div 
          className="p-6 rounded-lg shadow-2xl bg-gradient-to-r from-orange-400 to-orange-600 text-white transform hover:scale-105 transition-transform"
          data-aos="fade-up" data-aos-delay="400"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Pending Deliveries</h2>
              <p className="text-white mt-2">Orders waiting to be delivered</p>
            </div>
            <div className="text-4xl font-semibold">
          {confirmedLoader ? "..." : confirmed?.data?.count}
            </div>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div 
          className="p-6 rounded-lg shadow-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white transform hover:scale-105 transition-transform"
          data-aos="fade-up" data-aos-delay="500"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Customer Satisfaction</h2>
              <p className="text-white mt-2">Customer satisfaction rate</p>
            </div>
            <div className="text-4xl font-semibold">
              95%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
