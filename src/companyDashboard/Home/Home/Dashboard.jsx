import { useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useGetUser from '../../../hooks/useGetUser';
import { AuthContext } from '../../../provider/AuthProvider';
import logo from '../../../assets/img/Transparent-PNG-file.png'

const Dashboard = () => {
  const { logOut} = useContext(AuthContext)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const logOutHandle = async()=>{
await logOut();

}
const {userData, isLoading} = useGetUser()
console.log("role--->", userData?.userRole);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <div className="flex max-h-scr min-h-screen max-w-[2050px] mx-auto bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed  inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform  duration-300 ease-in-out bg-[#aa1936] text-white w-64 z-50 lg:static lg:translate-x-0`}>
        <Link to={'/'}>
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
        <img src={logo} alt=""  className="w-24 h-12 "/>
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

         
          { userData?.userRole ===  ("developer" || "owner") && <NavLink 
            to="/dashboard/userHandle" 
            className={({ isActive }) => 
              ` hidden  lg:flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
          Users Handle
          </NavLink>}
          { userData?.userRole ===  ("developer" || "owner") && <NavLink 
            to="/dashboard/setting" 
            className={({ isActive }) => 
              ` hidden  lg:flex items-center px-4 py-2 text-lg rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
         Setting
          </NavLink>}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between bg-white shadow-md px-4">
          <div className="flex items-center">
            <div className="text-lg font-semibold text-[#aa1936]">Role:</div>
            <div className="ml-2 px-4 py-1 text-lg font-semibold bg-[#aa1936] text-white rounded-md">
             {userData?.userRole}
            </div>
          </div>
          <div>
            <button onClick={logOutHandle} className="px-4 py-2 text-white bg-[#aa1936] rounded-md hover:bg-[#88172d]">
              Logout
            </button>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleSidebar} className="text-[#aa1936]">
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
