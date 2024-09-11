import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useGetUser from '../../../hooks/useGetUser';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const {userData, isLoading} = useGetUser()
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-[#2b97a4] text-white w-64 z-50 lg:static lg:translate-x-0`}>
        <Link to={'/'}>
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        </Link>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavLink 
            to="/dashboard/dashboardHome" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard/addProduct" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
           Add Product
          </NavLink>


          <NavLink 
            to="/dashboard/allProduct" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
          All Products
          </NavLink>
          <NavLink 
            to="/dashboard/pendingOrder" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
           Pending Order
          </NavLink>
          <NavLink 
            to="/dashboard/pendingDelevery" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
         Delevery Info
          </NavLink>

         
          <NavLink 
            to="/dashboard/settings" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between bg-white shadow-md px-4">
          <div className="flex items-center">
            <div className="text-lg font-semibold text-[#2b97a4]">Role:</div>
            <div className="ml-2 px-4 py-1 text-lg font-semibold bg-[#2b97a4] text-white rounded-md">
             {userData?.userRole}
            </div>
          </div>
          <div>
            <button className="px-4 py-2 text-white bg-[#2b97a4] rounded-md hover:bg-[#88172d]">
              Logout
            </button>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleSidebar} className="text-[#2b97a4]">
              <FiMenu size={24} />
            </button>
          </div>
        </header>

        {/* Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
