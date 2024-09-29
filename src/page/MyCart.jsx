import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useState, useEffect } from 'react';
import usePublicAxios from '../hooks/usePublicAxios';
import ColorLoader from '../component/loader/ColorLoader';
import { allDivision, districtsOf, upazilasOf } from '@bangladeshi/bangladesh-address';
import ButtonLoader from '../component/loader/ButtonLoader';

const MyCart = () => {
  const division = allDivision();

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [localCartItems, setLocalCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const axiosPublic = usePublicAxios();
  const [fishItem, setFishItems] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upozela, setUpozela] = useState([]); // State for storing upazilas
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false)

  const allDistrict = districtsOf(selectedDivision);

  const { data: cartData, isLoading, refetch } = useQuery({
    queryKey: ['cart', user],
    queryFn: async () => {
      if (user) {
        const { data } = await axiosSecure.get(`/fishCart/${user?.email}`);
        return data;
      }
      return [];
    },
    enabled: !!user,
  });

  const getData = async (cartItem) => {
    const { data } = await axiosPublic.post('/fetchFishItems', { cartItems: cartItem });
    setFishItems(data);
    const initialQuantities = {};
    data.forEach((item) => {
      initialQuantities[item._id] = 1;
    });
    setQuantities(initialQuantities);
  };

  useEffect(() => {
    if (!user) {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setLocalCartItems(storedCartItems);
      getData(storedCartItems);
    }
  }, [user]);

  // Fetch upazilas when district changes
  useEffect(() => {
    const fetchUpazilas = async () => {
      if (selectedDistrict) {
        const upazilas = await upazilasOf(selectedDistrict);
        setUpozela(upazilas.map(upazila => upazila.upazila)); // Extract upazila names
      }
    };

    fetchUpazilas();
  }, [selectedDistrict]);

  if (!user && localCartItems.length === 0) {
    return <p>Your cart is empty. Please log in to view your cart.</p>;
  }

  if (isLoading) {
    return <ColorLoader />;
  }

  const cartItems = user && cartData;

  // Group items by id and calculate quantity
  const groupedItems = user && cartItems.reduce((acc, item) => {
    if (!acc[item._id]) {
      acc[item._id] = { ...item, quantity: 0 };
    }
    acc[item._id].quantity += 1;
    return acc;
  }, {});

  const items = user ? Object.values(groupedItems) : fishItem;

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };
  
  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) - 1 > 0 ? (prev[id] || 1) - 1 : 1,
    }));
  };

  const subTotal = items.reduce((acc, item) => {
    const effectivePrice = item.productPrice * (1 - item.discount / 100);
    const quantity = quantities[item._id] || item.quantity;
    return acc + effectivePrice * quantity;
  }, 0);

  const deliveryCharge = 80;
  const totalPayable = subTotal + deliveryCharge;

  const handlePlaceOrder = async(e) => {
    e.preventDefault()
    setLoader(true)
    const productNames = items.map((item) => `${item.productName} (${item.productNameBangla})`);
    const productImages = items.map((item) => item.productImage);

    const totalQuantities = {};
    items.forEach((item) => {
      totalQuantities[`${item.productName} (${item.productNameBangla})`] =
        quantities[item._id] || item.quantity;
    });

    console.log(`Subtotal: $${subTotal}`);
    console.log(`Delivery Charge: $${deliveryCharge}`);
    console.log(`Total Payable: $${totalPayable}`);
    console.log('Product Names:');



    productNames.forEach((name) => {
      console.log(name);
    });
    console.log('Product Images:', productImages);
    console.log('Total Quantities:');
    Object.entries(totalQuantities).forEach(([productName, totalQuantity]) => {
      console.log(`${productName}: ${totalQuantity}`);
    });
    const name = e.target.name.value;
    const mobileNumber = e.target.mobileNumber.value;
    
    const address = e.target.adress.value;
    const comment = e.target.comment.value;
    const division = e.target.division.value;
    const district = e.target.district.value;
    const upozila = e.target.upozila.value;
    const adressB = e.target.adressB.value;
   

    const productIds = items.map((item) => item._id)
    const orderInfo = {
      status: "pending",
      subTotal,
      deliveryCharge,
      totalPayable,
      productImages,
      proudctInfo: totalQuantities,
      productIds: productIds,
      email:user?.email || "null",
name,
mobileNumber,
address,
comment,
division,
district,
upozila,
adressB

     
    }
  
await saveOrderInfo(orderInfo)


  };

  const saveOrderInfo = async(orderInfo)=>{

  const {data} = await axiosPublic.post('/saveOrder', orderInfo)
 if(data.insertedId){
  toast.success('Order request sent')
  localStorage.removeItem('cartItems')
  refetch()
  setLoader(false)
 }
 else{
  setLoader(false)
  toast.error("Something wen wrong please try again!")
 }
  }

  const removeHandle = async (id) => {


setLoading(true)

    
    try {
      if (user) {
        const { data } = await axiosSecure.delete(`/removeCart/${id}?email=${user?.email}`);
       
  
        if (data.deletedCount > 0) {
          toast.warning('Removed fish from cart');
    
          refetch();
          setLoading(false)
        }
      } else {
        const updatedCartItems = localCartItems.filter((item) => item !== id);
        setLocalCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        toast.warning('Removed fish from cart');
        getData(updatedCartItems);
        setLoading(false)
      }
      
      
    } catch (error) {
      
      toast.error("Something went wrong please try again")
    }
  };

  return (
    <div>
      <h1 className="text-2xl mt-8 font-bold text-center mb-6 text-[#aa1936]">My Cart</h1>
      <ToastContainer />
      <form onSubmit={handlePlaceOrder} className="mx-auto p-6 gap-8 justify-between md:flex bg-white rounded-lg shadow-lg mt-6">

      <div className="mt-6  flex-1">
          <div>
            <h2 className="text-xl font-bold mb-2 text-[#aa1936]">Billing Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                নাম
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                মোবাইল নাম্বার
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                type="tel"
                id="phone"
                name="mobileNumber"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                ইমেইল
              </label>
              <input
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
  type="email"
  id="email"
  name="email"
  value={ user?.email }

/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                সম্পূর্ণ ঠিকানা
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                type="text"
                id="address"
                name="adress"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="instructions">
                নির্দেশনা
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                id="instructions"
                name="comment"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="division">
                বিভাগ
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                id="division"
                name="division"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                required
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {division.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="district">
                জেলা
              </label>
              {/* <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                id="district"
                name="district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
             
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {allDistrict.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select> */}


              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                type="text"
                 id="district"
                name="district"
                required
              />

            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="upozela">
                উপজেলা
              </label>
              {/* <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                id="upozela"
                name="upozila"
              
              >
                <option value="">উপজেলা নির্বাচন করুন</option>
                {upozela.map((upazila, index) => (
                  <option key={index} value={upazila}>{upazila}</option>
                ))}
              </select> */}


              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                type="text"
               id="upozela"
                name="upozila"
                required
              />

            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="instructions">
             ঠিকানাঃ ঠিকানাতে স্পেসিফিক কিছু ইনফরমেশন দিতে চাইলে এখানে দিন।
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:border-transparent"
                id="instructions"
                name="adressB"
              />
            </div>
          </div>
        
        </div>

    

        <div className="space-y-6 flex-1">
          {items.map((item) => {
            const effectivePrice = item.productPrice * (1 - item.discount / 100);
            return (
              <div key={item._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#aa1936]">{`${item.productNameBangla} (${item.productName})`}</h2>
                  <p className="text-gray-700">Per Product Price: ${effectivePrice.toFixed(2)}</p>
                  <div className="flex items-center">
                  <button
                  type='button'
  onClick={() => decreaseQuantity(item._id)}
  className="px-2 py-1 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
>
  -
</button>
<span className="px-4">{quantities[item._id] || 1}</span>
<button
  onClick={() => increaseQuantity(item._id)}
  type='button'
  className="px-2 py-1 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
>
  +
</button>

                  </div>
                  <p className="text-gray-700">
                    Total Price: ${(effectivePrice * (quantities[item._id] || 1)).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <button
                  type='button'
                    onClick={() => removeHandle(!user ? item?._id : item?.id)}
                    className="px-4 py-2 text-white bg-[#aa1936] rounded-md hover:bg-[#88172d] focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:ring-offset-2 mb-2"
                  >
                 Remove
                 
                  </button>
                </div>
              </div>
            );
          })}

<div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-[#aa1936]">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal:</p>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Delivery Charge:</p>
              <p>${deliveryCharge.toFixed(2)}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <p className="font-bold">Total Payable:</p>
              <p className="font-bold">${totalPayable.toFixed(2)}</p>
            </div>
            <button
  type="submit"
  disabled={items.length === 0 || loader}
  className={`w-full mt-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#aa1936] hover:bg-[#88172d] focus:ring-[#aa1936]'}`}
>
{
  loader? <ButtonLoader className="text-center"/> : "Place Order"
}
</button>


          </div>
        </div>

      
      </form>
    </div>
  );
};

export default MyCart;
