import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SingleFishCard = ({ allFish }) => {
    const { _id, description, discount, productImage, productName, productNameBangla, productPrice, type } = allFish;
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
            <img className="w-full h-[250px] border-[#126456] border-2" src={productImage} alt={productName} />

            {discount && (
                <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-br-lg transform rotate-12 shadow-lg">
                    {discount}% OFF
                </div>
            )}

            <div className='bg-[#126456] flex justify-between font-work-sense px-4 py-2 text-white'>
                <h1 className='flex items-center gap-2'>Type</h1>
                <h1 className='flex items-center'>{type}</h1>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center text-[#2b97a4]">
                    {productName} ({productNameBangla})
                </div>
                <p className="text-gray-700 text-base">
                    {isExpanded ? description : `${description.slice(0, 50)} ...`}
                    <span
                        className='text-green-400 underline cursor-pointer'
                        onClick={toggleDescription}
                    >
                        {isExpanded ? ' Show Less' : ' See More'}
                    </span>
                </p>
                <div className="mt-2">
                    <span className="text-gray-900 font-semibold">Price: </span>
                    <span className={`text-lg ${discount ? 'line-through text-gray-500' : 'text-black'}`}>${productPrice}</span>
                    {discount && <span className="text-lg text-red-500 ml-2">Now: ${discountedPrice} </span>}
                </div>
                <div className="flex mt-4">
                    <button
                        className="w-1/2 mr-2 bg-[#2b97a4] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2b97a4] focus:ring-opacity-50"
                        onClick={addToCart}
                    >
                        Add to Cart
                    </button>
                    <button
                        className="w-1/2 ml-2 bg-[#2b97a4] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2b97a4] focus:ring-opacity-50"
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
    }).isRequired,
};

export default SingleFishCard;
