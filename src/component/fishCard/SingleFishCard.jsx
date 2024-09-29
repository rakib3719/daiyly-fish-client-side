import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { all } from 'axios';


const SingleFishCard = ({ allFish }) => {
    const { _id, description, discount, productImage, productName, productNameBangla, productPrice, type } = allFish;
    console.log(allFish?.stockStatus);
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
const navigate = useNavigate()
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const discountedPrice = discount ? (productPrice - (productPrice * discount / 100)).toFixed(2) : productPrice;

    const addToCart = async () => {
        if (!user) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(_id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log(`Added ${productName} to cart`);
            toast.success('Fish Successfully added to cart');
        } else {
            const cartInfo = {
               id: _id,
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

                if(data.message === "file already added to cart"){
                   toast.warning('This fish already added to cart')
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
            cartItems.push(_id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log(`Buying ${productName} now`);
          navigate('/mycart')

        } else {
            const cartInfo = {
             id:_id,
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

                if(data.message === "file already added to cart"){
                    navigate('/mycart')
                    return;
                }
                if (data?.insertedId) {
                    navigate('/mycart')
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
        <div className=" rounded overflow-hidden bg-base-100 border m-4 bg-w relative">
            <ToastContainer />
            <img className="w-full h-[250px] border-[#aa1936] border-2" src={productImage} alt={productName} />

            {   allFish?.stockStatus === "noStock"? <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-br-lg transform rotate-12 shadow-lg">
                Out Of Stock
                </div> : discount && (
                <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-br-lg transform rotate-12 shadow-lg">
                    {discount}% OFF
                </div>
            )}

            <div className='bg-[#aa1936] flex justify-between font-work-sense px-4 py-2 text-white'>
                <h1 className='flex items-center gap-2'>Type</h1>
                <h1 className='flex items-center'>{type}</h1>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center text-[#aa1936]">
                    {productName} ({productNameBangla})
                </div>
                <p className="text-gray-700 text-base">
                    {isExpanded ? description : `${description.slice(0, 50)} ...`}
                    <Link to={`/details/${_id}`}
                        className='text-green-400 underline cursor-pointer'
                        onClick={toggleDescription}
                    >
                      See more
                    </Link>
                </p>
                <div className="mt-2">
                    <span className="text-gray-900 font-semibold">Price: </span>
                    <span className={`text-lg ${discount ? 'line-through text-gray-500' : 'text-black'}`}><span className='text-2xl'>৳</span>{productPrice}</span>
                    {discount && <span className="text-lg text-red-500 ml-2">Now:  <span className='text-2xl'>৳</span>{discountedPrice}   </span>}
                </div>
                <div className="flex mt-4">
    <button
        disabled={allFish?.stockStatus === "noStock"}
        className={`w-1/2 mr-2 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 
        ${allFish?.stockStatus === "noStock"
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-[#aa1936] hover:bg-red-700 focus:ring-[#aa1936] focus:ring-opacity-50"
        }`}
        onClick={addToCart}
    >
        Add to Cart
    </button>
    <button
        disabled={allFish?.stockStatus === "noStock"}
        className={`w-1/2 ml-2 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 
        ${allFish?.stockStatus === "noStock"
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-[#aa1936] hover:bg-red-700 focus:ring-[#aa1936] focus:ring-opacity-50"
        }`}
        onClick={handleBuyNow}
    >
        Buy Now
    </button>
</div>

            </div>
        </div>
    );
};

SingleFishCard.propTypes = {
    allFish: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        discount: PropTypes.number,
        productImage: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productNameBangla: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        stockStatus: PropTypes.string.isRequired
    }).isRequired,
};

export default SingleFishCard;
