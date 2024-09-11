import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useGetUser from "../../hooks/useGetUser";



const Navbar = () => {



const {userData} = useGetUser();










const {user, logOut} = useContext(AuthContext)
const logoutHandle = ()=>{
  logOut()
 
}
  const nav = <>
  
  <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 "><NavLink to={'/'}>Home</NavLink></li>
  <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 "><NavLink to={'mycart'}>My Cart</NavLink></li>
  {
    
    userData?.userRole === "developer" ||  userData?.userRole === "owner" || userData?.userRole === "manager" || userData?.userRole === "employee" ? <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 "><NavLink to={'/dashboard/dashboardHome'}>DashBoard</NavLink></li> :   <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 "><NavLink to={'mycart'}>About us</NavLink></li> }


  <li onClick={logoutHandle} className="px-3 sm:hidden py-2 rounded-md text-sm font-medium text-gray-700 ml-3">Log Out</li>
       
    
  </>

    return (


      <div>


{/* <div className="  md:flex justify-between items-center p-2 bg-[#2b97a4] text-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs pr-10"
            />
            <button className="absolute inset-y-0 right-0 px-3 bg-[#283142] text-white hover:bg-[#1b212c] rounded-r transition duration-300">
              Search
            </button>
          </div>
          <div className="bg-white py-3 rounded px-6">
            Call us: <a href="tel:+1234567890" className="font-semibold text-[#ef4281]">+123 456 7890</a>
          </div>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost flex items-center gap-2">
              Languages
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-32">
              <li><a>English</a></li>
              <li><a>বাংলা</a></li>
              <li><a>Español</a></li>
            </ul>
          </div>
        </div>
      </div> */}


      <div className="navbar bg-base-100 max-w-[1400px] mx-auto">



<div className="navbar-start">
  <div className="dropdown">
    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
    </div>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      { nav }
    </ul>
  </div>
  <a className="btn font-bold md:text-3xl btn-ghost text-xl ">
Daily<span className="text-[#2b97a4]">Fish</span>
</a>
</div>
<div className="navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal px-1">
 {nav}
  </ul>
</div>
<div className="navbar-end  ">
{user ?
      <div className="navbar-end">
        <div className='flex items-center gap-4'>
          <img
            alt='User Profile Photo'
            src={user?.photoURL}
            className="rounded-full w-12 h-12 border-2 border-[#2b97a4] shadow-md"
          />
          <button onClick={logoutHandle} className='px-6 py-2 rounded-md bg-[#2b97a4] text-white font-semibold hover:bg-[#880d28] transition-all duration-300 hidden sm:block '>Logout</button>
        </div>
      </div> :  
      <div className="navbar-end">
        <div className='flex items-center gap-4'>
      <Link to={'/login'}>
      <button onClick={logoutHandle} className='btn font-raleway bg-[#2b97a4] text-white block text-center'>  Login </button></Link>
        </div>
      </div>
    }
</div>
</div>

      </div>
       
    );
};

export default Navbar;