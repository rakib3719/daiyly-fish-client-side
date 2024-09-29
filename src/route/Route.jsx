import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import Home from "../pages/home/Home";
import LoginPage from "../page/LoginPage";
import RegistrationPage from "../page/RegistrationPage";
import Dashboard from "../companyDashboard/Home/Home/Dashboard";
import DashBoardHome from "../companyDashboard/Home/Home/DashBoardHome";
import AddProduct from "../companyDashboard/Home/Home/AddProduct";
import CustomerDashboard from "../page/CustomerDashboard";
import MyCart from "../page/MyCart";
import UserPrivate from "../secureRoute/UserPrivate";
import AllProducts from "../page/ownerDashboard/AllProducts";
import PendingOrder from "../companyDashboard/Home/Home/PendingOrder";
import PendingDelevery from "../companyDashboard/Home/Home/PendingDelevery";
import CumpanySecure from "../secureRoute/CumpanySecure";
import AuthorSecure from "../secureRoute/AuthorSecure";
import SpecialSecure from "../secureRoute/SpecialSecure";
import FishDetails from "../component/fishCard/FishDetails";
import OrderTracking from "../component/orderTruck/OrderTruck";
import Review from "../page/Review";

import Setting from "../companyDashboard/Home/Home/Setting";
import UserHandle from "../companyDashboard/Home/Home/UserHandle";
import Blog from "../page/blogs/Blog";
import SingleBlog from "../component/blog/SingleBlog";
import BlogDetails from "../component/blog/BlogDetails";
import About from "../pages/about/About";
import Services from "../pages/services/Services";
import Faq from "../pages/faq/Faq";
import Contact from "../page/contact/Contact";

export const router = createBrowserRouter([

{
path:'/',
element:<Main></Main>,



children:[

{
    path:'/',
    element:<Home></Home>
},
{
    path:'/login',
    element:<LoginPage></LoginPage>
},
{
    path:'/registar',
    element:<RegistrationPage></RegistrationPage>
},
{
    path:'/review',
    element:<Review></Review>
},
{
    path:'/userDashboard',
    element:<CustomerDashboard></CustomerDashboard>
},
{
    path:'/mycart',
    element:<MyCart></MyCart>
},
{
    path:'/buy/:id',
    element:<MyCart></MyCart>  
}
,
{
    path:'/details/:id',
    element: <FishDetails></FishDetails>
    
},
{
    path:'/blogs',
    element: <Blog></Blog>
    
},
{
    path:'blogs/blogDetails/:id',
    element: <BlogDetails></BlogDetails>
    
},
{
    path:'/about',
    element: <About></About>
    
},
{
path:'/services',
element: <Services></Services>
},
{
path:'/faq',
element: <Faq></Faq>
},
{
path:'/contact',
element: <Contact></Contact>
},

{
    path:'/trackOrder',
    element: <UserPrivate>

<OrderTracking></OrderTracking>
    </UserPrivate>
}


]
},

// company dashboard route

{

    path:'/dashboard',
    element:<CumpanySecure>

<Dashboard></Dashboard>
    </CumpanySecure>,
    children:[

        {
            path:'/dashboard/dashboardHome',
            element:<CumpanySecure>

<DashBoardHome></DashBoardHome>
            </CumpanySecure>
        },
        {
            path:'/dashboard/addProduct',
            element:<AuthorSecure>

<AddProduct></AddProduct>
            </AuthorSecure>
        },
        {
            path:'/dashboard/allProduct',
            element:<CumpanySecure>

<AllProducts></AllProducts>
            </CumpanySecure>
        },
        {
            path:'/dashboard/pendingOrder',
            element:<CumpanySecure>

<PendingOrder></PendingOrder>
            </CumpanySecure>
        },
        {
            path:'/dashboard/pendingDelevery',
            element:<CumpanySecure>

<PendingDelevery></PendingDelevery>
            </CumpanySecure>
        },
        {
            path:'/dashboard/userHandle',
            element:<SpecialSecure>
                <UserHandle/>
            </SpecialSecure>},
        {
            path:'/dashboard/setting',
            element:<SpecialSecure>
                <Setting/>
            </SpecialSecure>}
    ]
}

])

