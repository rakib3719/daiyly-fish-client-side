import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DeleveryRow = ({ data, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openConfirmModal = (action) => {
    setActionType(action);
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalIsOpen(false);
    setModalIsOpen(false); // Close the main modal when the confirm modal is closed
  };

  const handleConfirm = async () => {
    try {
      const response = await axiosSecure.put(`/updateStatus/${data._id}?status=${actionType}`);
      if (response.status === 200) {
        toast.success(`Order ${actionType === 'done' ? 'marked as done' : 'sent to courier'} successfully!`);
        closeConfirmModal();
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const printInvoice = () => {
    window.print();
  };

  const productInfo = data?.productInfo;

  return (
    <>
      <tr>
        <td className="p-3">{idx + 1}</td>
        <td className="p-3 hidden md:block ">{data._id}</td>
        <td className="p-3">{data?.name || 'Unknown'}</td>
        <td className="p-3">{data?.status || 'Unknown'}</td>
        <td className="p-3 hidden md:block ">{data?.mobileNumber || 'Unknown'}</td>
        <td className="p-3">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-[#2b97a4] text-white rounded-md hover:bg-[#9a0f31] focus:outline-none focus:ring-2 focus:ring-[#2b97a4] focus:ring-opacity-50 transition duration-200"
          >
            <FaInfoCircle className="mr-2" />
            Details
          </button>
        </td>
      </tr>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Invoice"
        className="fixed inset-0 ml-24 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl">
          <div id="invoice" className="print-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Invoice</h2>
              <button
                onClick={printInvoice}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 print:hidden"
              >
                Print
              </button>
            </div>
            <div className="border-t-2 border-b-2 py-4 mb-6">
              <h3 className="text-lg font-semibold">Daily Fish</h3>
              <p>Company Address, City, Country</p>
              <p>Phone: +123456789</p>
              <p>Email: info@company.com</p>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold">Billing To:</h4>
                <p>{data.name}</p>
                <p>{data?.upozila}, {data?.district}, {data?.division}</p>
                <p>{data.email}</p>
                <p>{data.mobileNumber}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Invoice Details:</h4>
                <p><strong>Invoice ID:</strong> {data._id}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold">Order Summary:</h4>
              <ul className="list-disc pl-5">
                {productInfo && Object.entries(productInfo).map(([product, quantity], idx) => (
                  <li key={idx}>{product}: {quantity} KG</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mb-6">
              <p><strong>Product Price:</strong> ${data.subTotal}</p>
              <p><strong>Delivery Charge:</strong> ${data.deliveryCharge}</p>
              <p><strong>Total Payable:</strong> ${data.totalPayable}</p>
            </div>
            <p><strong>Comment:</strong> {data.comment}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => openConfirmModal('done')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
              Delivery Done
            </button>
            <button
              onClick={() => openConfirmModal('courier')}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
            >
              On The Courier
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#2b97a4] text-white rounded-md hover:bg-[#9a0f31] focus:outline-none focus:ring-2 focus:ring-[#2b97a4] focus:ring-opacity-50 transition duration-200"
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
              Confirm
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

DeleveryRow.propTypes = {
  data: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default DeleveryRow;
