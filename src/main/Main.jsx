import { Outlet } from "react-router-dom";
import Navbar from "../component/home/Navbar";
import Footer from "../component/footer/Footer";



const Main = () => {
    return (
        <div className="max-w-[1400px] mx-auto">
            <Navbar></Navbar>
       
<Outlet></Outlet>

<Footer/>

        </div>
    );
};

export default Main;