import useFIshCard from "../../component/useFIshCard";
import { MdSystemUpdateAlt, MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../provider/AuthProvider";
import ColorLoader from "../../component/loader/ColorLoader";
import TableLoader from "../../component/loader/TableLoader";

const AllProducts = () => {
    const { user } = useContext(AuthContext);
    const { allFish, isLoading, refetch} = useFIshCard();
    const axiosSecure = useAxiosSecure();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFish, setSelectedFish] = useState(null);

    const [formData, setFormData] = useState({
        productPrice: '',
        discount: '',
        productImage: '',
        description: '',
        type: ''
    });

    if (isLoading) {
        return <ColorLoader></ColorLoader>
    }

    const deleteFish = async (id) => {
        const data = await axiosSecure.delete(`/delete/${id}`);
        console.log(data);

        if (data?.data?.deletedCount > 0) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
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
            confirmButtonText: "Yes, delete it!"
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
            discount: fish.discount || '',
            productImage: fish.productImage,
            description: fish.description,
            type: fish.type
        });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedFish(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            const productPrice = form.productPrice.value;
            const discount = form.discount.value;
            const description = form.description.value;
            const type = form.type.value;
            const updateInfo = {
                productPrice,
                discount,
                description,
                type,
                email: user?.email
            };

            const { data } = await axiosSecure.put(`/update/${selectedFish._id}`, updateInfo);

            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your product has been updated.",
                    icon: "success"
                });
                refetch();
                closeModal();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "No changes were made to the product.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "An error occurred while updating the product.",
                icon: "error"
            });
        }
    };

    const calculateTotalPrice = (price, discount) => {
        return price - (price * (discount / 100));
    };

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
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
                        {allFish.map((data, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-100">
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">{data?.productName}</td>
                                <td className="p-3 hidden md:block">${data.productPrice}</td>
                                <td className="p-3 hidden md:block">{!data?.discount ? "0" : data?.discount}%</td>
                                <td className="p-3">${calculateTotalPrice(data.productPrice, data.discount || 0).toFixed(2)}</td>
                                <td className="p-3 flex gap-4">
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(data)}>
                                        <MdSystemUpdateAlt size={24} />
                                    </button>
                                    <button onClick={() => deleteHandle(data?._id)} className="text-red-500 hover:text-red-700">
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
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal} className="mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-[#2b97a4] hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Update
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AllProducts;
