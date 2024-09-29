import { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Swal from 'sweetalert2';
import ButtonLoader from '../../../component/loader/ButtonLoader';
import { imageUpload } from '../../../utilites/photoUpload';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    productName: '',
    productNameBangla: '',
    productPrice: '',
    discount: '',
    description: '',
   
  });

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const image_url = await imageUpload(image)
    setProductImage(image_url)


    // Resizer.imageFileResizer(
    //   file,
    //   800, // max width
    //   800, // max height
    //   'JPEG', // format
    //   80, // quality
    //   0, // rotation
    //   (uri) => {
    //     ;
    //   },
    //   'base64' // output type
    // );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const type = e.target.type.value;
    const stockStatus = e.target.stock.value;
    const productData = {
      ...formData,
      productImage,
      email: user?.email,
      type: type,
      stockStatus: stockStatus
    };
    console.log('Product Data:', productData);

    try {
      const data = await axiosSecure.post(`/addFish`, productData);
      setLoading(false)

if(data?.data.insertedId){
setLoading(false)
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Successfully added product in website",
    
  });
}

     
    } catch (err) {
      setLoading(false)
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
        
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6 text-[#aa1936]">Add New Product</h1>
      <form className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6" onSubmit={handleSubmit}>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
            required
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Product Name (Bangla)</label>
          <input
            type="text"
            name="productNameBangla"
            value={formData.productNameBangla}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
            required
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Product Price</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
            required
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Discount %</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
          />
        </div>


        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Product Picture</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
          />
          {productImage && (
            <div className="mt-4">
              <img src={productImage} alt="Product Preview" className="max-h-48 w-full object-cover rounded-lg shadow-md" />
            </div>
          )}
        </div>

        <div className="">
          <label className="block text-sm font-medium text-gray-700">Stock Status</label>
          <select
            name="stock"
          
        
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
            required
          >
            <option value="stock">On stock</option>
            <option value="noStock">Out of stock</option>
           
          </select>
        </div>



        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
            rows="4"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#aa1936] focus:border-[#aa1936]"
            required
          >
            <option value="নদী">নদী</option>
            <option value="হাওড়">হাওড়</option>
            <option value="সামুদ্রিক">সামুদ্রিক</option>
            <option value="shutki">শুটকি</option>
            <option value="has">হাঁস-মুরগী

            </option>
          </select>
        </div>
        <div className="md:col-span-2 text-center">
          <button disabled={loading} type="submit" className="px-6 py-2 text-white bg-[#aa1936] rounded-md hover:bg-[#88172d] focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:ring-offset-2">
      {loading? <ButtonLoader></ButtonLoader> :      "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
