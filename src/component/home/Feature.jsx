import { FaLeaf, FaTractor, FaTruckLoading } from "react-icons/fa";
import { FaHouseLock } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Feature = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    
    return (
        <div className="p-12">
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div data-aos="fade-right" className="group space-y-3 shadow-md border px-8 py-6">
                    <FaLeaf className="text-3xl text-[#aa1936] group-hover:text-black"/>
                    <h1 className="text-xl font-bold">100% ASSURANCE</h1>
                    <h1 className="w-4 h-[3px] bg-[#aa1936] mt-2 transition-all duration-300 group-hover:w-8 group-hover:bg-black"></h1>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
                </div>

                <div data-aos="fade-right" className="group space-y-3 shadow-md border px-8 py-6">
                    <FaTractor className="text-3xl text-[#aa1936] group-hover:text-black"/>
                    <h1 className="text-xl font-bold">EXPRESS DELIVERY</h1>
                    <h1 className="w-4 h-[3px] bg-[#aa1936] mt-2 transition-all duration-300 group-hover:w-8 group-hover:bg-black"></h1>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
                </div>

                <div data-aos="fade-right" className="group space-y-3 shadow-md border px-8 py-6">
                    <FaHouseLock className="text-3xl text-[#aa1936] group-hover:text-black"/>
                    <h1 className="text-xl font-bold">SECURE</h1>
                    <h1 className="w-4 h-[3px] bg-[#aa1936] mt-2 transition-all duration-300 group-hover:w-8 group-hover:bg-black"></h1>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
                </div>

                <div data-aos="fade-right" className="group space-y-3 shadow-md border px-8 py-6">
                    <FaTruckLoading className="text-3xl text-[#aa1936] group-hover:text-black"/>
                    <h1 className="text-xl font-bold">60 DAYS FREE RETURNS</h1>
                    <h1 className="w-4 h-[3px] bg-[#aa1936] mt-2 transition-all duration-300 group-hover:w-8 group-hover:bg-black"></h1>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
                </div>

            </section>
        </div>
    );
};

export default Feature;
