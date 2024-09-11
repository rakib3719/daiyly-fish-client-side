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
import AllProducts from "../page/ownerDashboard/AllProducts";
import PendingOrder from "../companyDashboard/Home/Home/PendingOrder";
import PendingDelevery from "../companyDashboard/Home/Home/PendingDelevery";
import CumpanySecure from "../secureRoute/CumpanySecure";
import AuthorSecure from "../secureRoute/AuthorSecure";
import Settings from "../companyDashboard/Home/Home/Settings";

export const router = createBrowserRouter([

{
path:'/',
element:<Main></Main>,
errorElement: <p>Page Not Found</p>,


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
            path:'/dashboard/settings',
            element:<CumpanySecure>
<Settings></Settings>
            </CumpanySecure>
        }
    ]
}

])

