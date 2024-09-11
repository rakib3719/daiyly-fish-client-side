import { Outlet } from "react-router-dom";
import Navbar from "../component/home/Navbar";



const Main = () => {
    return (
        <div className="max-w-[1400px] mx-auto">
            <Navbar></Navbar>
       
<Outlet></Outlet>

        </div>
    );
};

export default Main;