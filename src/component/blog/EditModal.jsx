import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditModal = ({ postData, onClose }) => {
    const [value, setValue] = useState(postData.postText);
    const [loader, setLoader] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            const updatedBlog = {
                ...postData,
                postText: value,
            };

            const resp = await axiosSecure.put(`/blog/${postData._id}`, updatedBlog);
            if (resp?.data?.modifiedCount) {
                toast.success("Post updated successfully!");
                onClose(); // Close the modal
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-bold text-[#aa1936]">Edit Post</h2>
                <form onSubmit={handleEditSubmit}>
                    <div className='max-h-[300px] overflow-y-scroll'>
                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                    </div>

                    <div className="text-right">
                        <button type="submit" disabled={loader} className={`btn bg-[#aa1936] text-white ${loader && "cursor-not-allowed"}`}>
                            {loader ? "loading..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
