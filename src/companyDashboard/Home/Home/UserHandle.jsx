import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaUser,  FaBell, FaLock } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ColorLoader from '../../../component/loader/ColorLoader';
import AllEmployee from './AllEmployee';

import { AiOutlineUserAdd } from "react-icons/ai";
import Allusers from './Allusers';

const UserHandle = () => {
  const [activeTab, setActiveTab] = useState('employee Account');
  const axiosSecure = useAxiosSecure();

  const { data: totalUser, refetch, isLoading } = useQuery({
    queryKey: ['allusers'],
    queryFn: async () => {
      const resp = await axiosSecure.get('/allusers');
      return resp?.data;
    }
  });

  const { data: employeer, refetch: employeeRefetch, isLoading: employeerLoading } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const resp = await axiosSecure.get('/employeerSetting');
      return resp?.data;
    }
  });

  if (isLoading || employeerLoading) {
    return <ColorLoader />;
  }

  return (
    <div className="min-h-screen hidden lg:block bg-gray-100">
      {/* Always Visible Top Bar */}

      <div className='lg:hidden'>
<h1>T</h1>
      </div>
      <div className="bg-white shadow-lg p-4 flex items-center justify-center space-x-8 w-full">
        <button 
          onClick={() => setActiveTab('employee Account')} 
          className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'employee Account' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <FaUser size={20} className="mr-2" />
          Employee Account
        </button>
        <button 
          onClick={() => setActiveTab('all user')} 
          className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'all user' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <FaUser size={20} className="mr-2" />
        All User
        </button>
       
     
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'employee Account' && (
          <div>
            <h3 className="text-xl font-bold mb-4">User Settings</h3>
            <p className="text-gray-600">Manage your employee Account details and preferences.</p>
            <div className='grid md:grid-cols-2 2xl:grid-cols-3'>
              {employeer && employeer.map(data => (
                <AllEmployee key={data._id} data={data} />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'all user' && (
          <Allusers/>
        )}
       
       
      </div>
    </div>
  );
};

export default UserHandle;
