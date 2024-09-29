import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import usePublicAxios from "../../hooks/usePublicAxios";
import fish from '../../assets/img/fish.jpg';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import ColorLoader from "../loader/ColorLoader";

const FishDetails = () => {
    const axiosPublic = usePublicAxios();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data } = useQuery({
        queryKey: ['fishDetails', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/fishDetails/${id}`);
            return data;
        }
    });

    if (!data) {
        return <div className="text-center text-lg mt-10">
<ColorLoader/>

        </div>;
    }

    const { description, discount, productImage, productName, productNameBangla, productPrice, type } = data;

    const discountedPrice = discount ? (productPrice - (productPrice * discount / 100)).toFixed(2) : productPrice;

    const addToCart = async () => {
        if (!user) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log(`Added ${productName} to cart`);
            toast.success('Fish Successfully added to cart');
        } else {
            const cartInfo = {
                id,
                description,
                discount,
                productImage,
                productName,
                productNameBangla,
                productPrice,
                type,
                email: user?.email,
                name: user?.displayName
            };

            try {
                const response = await axiosSecure.post('/addCart', cartInfo);
                const data = response?.data;

                if (data.message === "file already added to cart") {
                    toast.warning('This fish already added to cart');
                    return;
                }
                if (data?.insertedId) {
                    toast.success('Fish Successfully added to cart');
                } else {
                    toast.error('Failed to add fish to cart');
                }
            } catch (err) {
                console.error('Error adding to cart:', err);
                toast.error(err.message);
            }
        }
    };

    const handleBuyNow = async () => {
        if (!user) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log(`Buying ${productName} now`);
            navigate('/mycart');
        } else {
            const cartInfo = {
                id,
                description,
                discount,
                productImage,
                productName,
                productNameBangla,
                productPrice,
                type,
                email: user?.email,
                name: user?.displayName
            };

            try {
                const response = await axiosSecure.post('/addCart', cartInfo);
                const data = response?.data;
                console.log(data);

                if (data.message === "file already added to cart") {
                    navigate('/mycart');
                    return;
                }
                if (data?.insertedId) {
                    navigate('/mycart');
                } else {
                    toast.error('Failed to add fish to cart');
                }
            } catch (err) {
                console.error('Error adding to cart:', err);
                toast.error(err.message);
            }
        }
    };

    return (
        <div>
            <ToastContainer />
            <div
                className="hero min-h-60 bg-fixed"
                style={{
                    backgroundImage: `url(${fish})`,
                }}>
                <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-bold">What happens when you eat seafood?</h1>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white  rounded-lg max-w-5xl w-full overflow-hidden">
                    <div className="relative">
                        <img className=" rounded w-full" src={productImage} alt={productName} />
                        {discount && (
                            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-lg font-extrabold rounded-lg shadow-xl">
                                {discount}% OFF
                            </div>
                        )}
                    </div>

                    <div className="p-8  bg-gray-100">
                        {/* Product Name and Type */}
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#aa1a37] mb-2">
                            {productName} <span className="text-lg md:text-2xl text-gray-600">({productNameBangla})</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 mb-4 italic">{type}</p>

                        {/* Price Details */}
                        <div className="flex flex-col sm:flex-row items-center mb-8">
                            <span className="text-gray-900 font-bold text-xl sm:text-2xl">Price: </span>
                            <span className={`text-xl sm:text-2xl ${discount ? 'line-through text-gray-500 sm:ml-4 mt-2 sm:mt-0' : 'ml-4 text-black'}`}>
                                ৳{productPrice}
                            </span>
                            {discount && (
                                <span className="text-xl sm:text-2xl text-red-500 font-semibold ml-4 mt-2 sm:mt-0">
                                    Now: ৳{discountedPrice}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#aa1a37] underline mb-4">Description</h3>
                            <p className="text-gray-700 leading-loose text-base md:text-lg border-t-2 border-b-2 py-4 border-gray-300 px-4 bg-white shadow-inner rounded-lg">
                                {description}
                            </p>
                        </div>

                        {/* Add to Cart and Buy Now Buttons */}
                        <div className="flex mt-8">
                            <button
                                onClick={addToCart}
                                className="bg-[#aa1a37] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 mr-4"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-[#aa1a37] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Go Back Button */}
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FishDetails;
