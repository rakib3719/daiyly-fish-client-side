
import Meet from "../../companyDashboard/Home/Home/Meet";
import FishCard from "../../component/fishCard/FishCard";
import Footer from "../../component/footer/Footer";
import Banner from "../../component/home/Banner";
import Feature from "../../component/home/Feature";
import Update from "../../component/home/Update";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FishCard/>
            <Meet/>
            <Update/>
       
            <Feature/>

      
        </div>
    );
};

export default Home;