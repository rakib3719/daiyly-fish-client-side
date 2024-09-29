import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAxiosSecure from '../../../hooks/useAxiosSecure';

// Set the app element for accessibility
Modal.setAppElement('#root');

const PendingRow = ({ data, idx, refetch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // To track the action type: confirm or cancel
const axiosSecure =  useAxiosSecure()
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openConfirmModal = (action) => {
    setActionType(action);
    setConfirmModalIsOpen(true);
  };
  const closeConfirmModal = () => setConfirmModalIsOpen(false);

  const handleConfirm = async () => {
    try {
      const response = await axiosSecure.put(`/updateStatus/${data._id}?status=${actionType}`);
      if (response.status === 200) {
        toast.success(`Order ${actionType === 'confirmed' ? 'confirmed' : 'canceled'} successfully!`);
        closeConfirmModal();
        refetch()
        // Optionally, you can refresh the order list here or update the state
      }
    } catch (error) {
      toast.error(error.message)
    }
  };


  console.log("status--->",actionType);
  const productInfo = data?.proudctInfo;

  return (
    <>
      <tr>
        <td className="p-3">{idx + 1}</td>
        <td className="p-3 hidden md:block">{data._id}</td>
        <td className="p-3">{data?.name || 'Unknown'}</td>
      
        <td className="p-3">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-[#aa1936] text-white rounded-md hover:bg-[#9a0f31] focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:ring-opacity-50 transition duration-200"
          >
            <FaInfoCircle className="mr-2" />
            Details
          </button>
        </td>
      </tr>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Details"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Mobile Number:</strong> {data?.mobileNumber || 'Unknown'}</p>
            <p><strong>Address:</strong> {data?.upozila},{data?.district},{data?.division}</p>
            <p><strong>Product Info:</strong></p>
            <ul className="list-disc pl-5">
              {productInfo && Object.entries(productInfo).map(([product, quantity], idx) => (
                <li key={idx}>{product}: {quantity} KG</li>
              ))}
            </ul>
            {/* Add more data fields as needed */}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => openConfirmModal('confirmed')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
              Confirm Order
            </button>
            <button
              onClick={() => openConfirmModal('canceled')}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
            >
              Cancel Order
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#aa1936] text-white rounded-md hover:bg-[#9a0f31] focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:ring-opacity-50 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={confirmModalIsOpen}
        onRequestClose={closeConfirmModal}
        contentLabel="Confirm Action"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
              Sure
            </button>
            <button
              onClick={closeConfirmModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

PendingRow.propTypes = {
  data: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  refetch:PropTypes.object
};

export default PendingRow;