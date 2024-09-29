import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useGetUser from "../../hooks/useGetUser";
import { IoMdClose } from "react-icons/io";

import logo from '../../assets/img/Transparent-PNG-file.png';

const Navbar = () => {
  const { userData } = useGetUser();
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false); // State for "More" section

  const logoutHandle = () => {
    logOut();
  };

  const nav = (
    <>
      <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <NavLink to="mycart">My Cart</NavLink>
      </li>
     
      <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <NavLink to="/review">Review</NavLink>
      </li>
      <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
    

      {userData?.userRole === "developer" || userData?.userRole === "owner" || userData?.userRole === "manager" || userData?.userRole === "employee" ? (
        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
          <NavLink to="/dashboard/dashboardHome">Dashboard</NavLink>
        </li>
      ) : (
        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
          <NavLink to="/trackOrder">Order Track</NavLink>
        </li>
      )}

      {/* More Dropdown - Mobile Behavior */}
      <li className="relative group px-3 py-2 rounded-md text-sm font-medium text-gray-700 cursor-pointer lg:hidden">
        <div
          onClick={() => setMoreOpen(!moreOpen)}
          className="flex justify-between items-center"
        >
          <p>More</p>
          <span>
            {moreOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 00-1.414 0L10 13.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </span>
        </div>

        {/* Show More Links when clicked on mobile */}
        <ul
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            moreOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <li className=" py-2 px-3 border-b text-sm font-medium text-gray-700">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li className="px-3 border-b py-2  text-sm font-medium text-gray-700">
            <NavLink to="/services">Services</NavLink>
          </li>
          <li className="px-3 py-2 border-b  text-sm font-medium text-gray-700">
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <li className="px-3 py-2 border-b  text-sm font-medium text-gray-700">
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </li>

      {/* Desktop More Menu */}
      <li className="relative group hidden lg:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 cursor-pointer">
        <p>More</p>
        <ul className="absolute left-0 mt- border-2 border-gray-400 w-40 bg-white shadow-lg rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 transform -translate-y-4">
          <li className=" py-2 px-3 border-b text-sm font-medium text-gray-700">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li className="px-3 border-b py-2  text-sm font-medium text-gray-700">
            <NavLink to="/services">Services</NavLink>
          </li>
          <li className="px-3 py-2 border-b  text-sm font-medium text-gray-700">
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <li className="px-3 py-2 border-b  text-sm font-medium text-gray-700">
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </li>

      <li onClick={logoutHandle} className="md:hidden py-2 rounded-md text-sm font-medium text-gray-700 ml-3">
        Log Out
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 max-w-[1400px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => setSidebarOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          </div>
          <a className="btn font-bold md:text-3xl btn-ghost text-xl">
            Daily<span className="text-[#aa1936]">Fish</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="navbar-end">
              <div className="flex items-center gap-4">
                <img
                  alt="User Profile Photo"
                  src={user?.photoURL || userData?.userPhoto}
                  className="rounded-full w-12 h-12 border-2 border-[#aa1936] shadow-md"
                />
                <button onClick={logoutHandle} className="px-6 py-2 rounded-md bg-[#aa1936] text-white font-semibold hover:bg-[#880d28] transition-all duration-300 hidden sm:block">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <button className="btn font-raleway bg-[#aa1936] text-white block text-center">Login</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)} />
      )}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
          <IoMdClose  className=""/>
          </button>
          <ul className="mt-6 space-y-2">{nav}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
