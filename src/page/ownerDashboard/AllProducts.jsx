import useFIshCard from "../../component/useFIshCard";
import { MdSystemUpdateAlt, MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../provider/AuthProvider";
import ColorLoader from "../../component/loader/ColorLoader";
import TableLoader from "../../component/loader/TableLoader";
import ButtonLoader from "../../component/loader/ButtonLoader";

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const { allFish, isLoading, refetch } = useFIshCard();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const [loader, setLoader] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterStock, setFilterStock] = useState("");

  const [formData, setFormData] = useState({
    productPrice: "",
    discount: "",
    productImage: "",
    description: "",
    type: "",
  });

  if (isLoading) {
    return <ColorLoader></ColorLoader>;
  }

  const deleteFish = async (id) => {
    const data = await axiosSecure.delete(`/delete/${id}`);
    console.log(data);

    if (data?.data?.deletedCount > 0) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
    refetch();
  };

  const deleteHandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFish(id);
      }
    });
  };

  const openModal = (fish) => {
    setSelectedFish(fish);
    setFormData({
      productPrice: fish.productPrice,
      discount: fish.discount || "",
      productImage: fish.productImage,
      description: fish.description,
      type: fish.type,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFish(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const form = e.target;
      const productPrice = form.productPrice.value;
      const discount = form.discount.value;
      const description = form.description.value;
      const type = form.type.value;
      const stockStatus = form.stock.value;

      const updateInfo = {
        productPrice,
        discount,
        description,
        type,
        stockStatus,
        email: user?.email,
      };

      const { data } = await axiosSecure.put(`/update/${selectedFish._id}`, updateInfo);
      setLoader(false);

      if (data?.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Your product has been updated.",
          icon: "success",
        });
        refetch();
        closeModal();
      } else {
        Swal.fire({
          title: "Error!",
          text: "No changes were made to the product.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred while updating the product.",
        icon: "error",
      });
      setLoader(false);
    }
  };

  const calculateTotalPrice = (price, discount) => {
    return price - price * (discount / 100);
  };

  const filteredFish = allFish.filter((fish) => {
    const typeMatches = filterType === "" || fish.type === filterType;
    const stockMatches =
      filterStock === "" ||
      (filterStock === "stock" && fish.stockStatus === "stock") ||
      (filterStock === "noStock" && fish.stockStatus === "noStock");
    return typeMatches && stockMatches;
  });

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterStockChange = (e) => {
    setFilterStock(e.target.value);
  };

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex gap-4 mb-4">
        <select
          name="type"
          value={filterType}
          onChange={handleFilterTypeChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
        >
          <option value="">Filter by Type</option>
          <option value="নদী">নদী</option>
          <option value="হাওড়">হাওড়</option>
          <option value="সামুদ্রিক">সামুদ্রিক</option>
          <option value="shutki">শুটকি</option>
          <option value="has">হাঁস-মুরগী</option>
        </select>

        <select
          name="stock"
          value={filterStock}
          onChange={handleFilterStockChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
        >
          <option value="">Filter by Stock</option>
          <option value="stock">On Stock</option>
          <option value="noStock">Out of Stock</option>
        </select>
      </div>

      <div className="overflow-x-auto table-sm">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-[#126456] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 hidden md:block text-left">Price</th>
          
              <th className="p-3 text-left hidden md:block ">Discount</th>
  
              <th className="p-3 text-left">Total Price</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFish.map((data, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-100">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{data?.productName}</td>
                <td className="p-3 hidden md:block">${data.productPrice}</td>
                <td className="p-3 hidden md:block">{!data?.discount ? "0" : data?.discount}%</td>
                <td className="p-3">${calculateTotalPrice(data.productPrice, data.discount || 0).toFixed(2)}</td>
                <td className="p-3 flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal(data)}
                  >
                    <MdSystemUpdateAlt size={24} />
                  </button>
                  <button
                    onClick={() => deleteHandle(data?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDeleteForever size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="Update Product"
      >
        <h2 className="text-2xl mb-4">Update Product</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Price</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={(e) => setFormData({ ...formData, productPrice: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="নদী">নদী</option>
              <option value="হাওড়">হাওড়</option>
              <option value="সামুদ্রিক">সামুদ্রিক</option>
              <option value="shutki">শুটকি</option>
              <option value="has">হাঁস-মুরগী</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Status</label>
            <select
              name="stock"
              value={formData.stockStatus}
              onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="stock">In Stock</option>
              <option value="noStock">Out of Stock</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className={`mt-4 w-full p-2 text-white ${
                loader ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
              } rounded-md`}
              disabled={loader}
            >
              {loader ? <ButtonLoader /> : "Update Product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AllProducts;
