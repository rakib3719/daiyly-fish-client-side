import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaUser, FaPaintBrush, FaBell, FaLock, FaBars } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
const axiosSecure = useAxiosSecure()
const {data:totalUser, refetch, isLoading} = useQuery({

  queryKey:['allusers'],
  queryFn: async()=>{

const resp =await axiosSecure.get('/allusers');
return resp?.data;

  }
})

if(isLoading){
  return <p>loading...</p>
}


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg p-4 ${isSidebarExpanded ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="flex justify-between items-center">
          <button 
            className="text-gray-700 hover:text-indigo-500" 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          >
            <FaBars size={20} />
          </button>
          {isSidebarExpanded && (
            <h2 className="text-2xl font-bold">Settings</h2>
          )}
        </div>
        <ul className="mt-8 space-y-4">
          <li>
            <button 
              onClick={() => setActiveTab('account')} 
              className={`flex items-center w-full text-left p-2 rounded-lg ${activeTab === 'account' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FaUser size={20} className="mr-2" />
              {isSidebarExpanded && 'Account'}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('appearance')} 
              className={`flex items-center w-full text-left p-2 rounded-lg ${activeTab === 'appearance' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FaPaintBrush size={20} className="mr-2" />
              {isSidebarExpanded && 'Appearance'}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('notifications')} 
              className={`flex items-center w-full text-left p-2 rounded-lg ${activeTab === 'notifications' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FaBell size={20} className="mr-2" />
              {isSidebarExpanded && 'Notifications'}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('security')} 
              className={`flex items-center w-full text-left p-2 rounded-lg ${activeTab === 'security' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FaLock size={20} className="mr-2" />
              {isSidebarExpanded && 'Security'}
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {activeTab === 'account' && (
          <div>
            <h3 className="text-xl font-bold mb-4">User Settings</h3>
            <p className="text-gray-600">Manage your account details and preferences.</p>
            {/* Account settings content here */}
          </div>
        )}
        {activeTab === 'appearance' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Appearance Settings</h3>
            <p className="text-gray-600">Customize the look and feel of your interface.</p>
            {/* Appearance settings content here */}
          </div>
        )}
        {activeTab === 'notifications' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Notification Settings</h3>
            <p className="text-gray-600">Manage your notification preferences.</p>
            {/* Notification settings content here */}
          </div>
        )}
        {activeTab === 'security' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Security Settings</h3>
            <p className="text-gray-600">Manage your security settings and password.</p>
            {/* Security settings content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
