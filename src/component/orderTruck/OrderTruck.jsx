import { useContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import ColorLoader from '../loader/ColorLoader';
import Truck from './Truck';

const OrderTracking = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orderTruck', user?.email], // Changed queryKey to an array to follow TanStack Query v4 rules
    queryFn: async () => {
      const data = await axiosSecure.get(`/truck/${user?.email}`);
      return data; // Return the data directly instead of 'data.data'
    },
    enabled: !!user, // Only run if the user exists
  });

  if (isLoading) {
    return <ColorLoader />;
  }

  if(isError){
  return <h1>Something went wrong--please refresh the page</h1>
  }

 

  const orderInfo = data?.data;
if(orderInfo.length < 1){
  return <h1 className='text-3xl text-center mt-24 text-red-600'>You are no order yet!</h1>
}
  return (
    <div className='grid md:grid-cols-3 gap-4'>
      {orderInfo && orderInfo.length > 0 &&  orderInfo.map((order, idx) => (
          <Truck key={order._id} order={order} idx={idx} />
        ))
      
      }
    </div>
  );
};

export default OrderTracking;
