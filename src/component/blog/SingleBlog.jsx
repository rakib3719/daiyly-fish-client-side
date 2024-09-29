import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetUser from '../../hooks/useGetUser';
import ColorLoader from '../loader/ColorLoader';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SingleBlog = ({ data, refetch }) => {
  const { user } = useContext(AuthContext);
  const { userData} = useGetUser();
  const postText = data?.postText && data.postText.length > 150 ? data.postText.slice(0, 150) + '....' : data?.postText;

  const [showDeleteIcon, setDeleteIcon] = useState(false);


  const navigate = useNavigate()
const navigateHandle = (id)=>{
navigate(`blogDetails/${id}`)
}

  // Correct role checking
  useEffect(() => {
    const allowedRoles = ['developer', 'owner', 'manager'];
    if (userData && allowedRoles.includes(userData.userRole)) {
      setDeleteIcon(true); // Show delete icon for developers, owners, and managers
    }

    // Check if the user is the author
    if (user?.email === data?.authorEmail) {
      setDeleteIcon(true); // Show delete icon if the user is the author
    }

    if (!user) {
      setDeleteIcon(false); // Hide delete icon if no user is logged in
    }

  }, [userData, user, data]);

  const axiosSecure = useAxiosSecure();

  const deleteBlog = async (id) => {
    try {
      const resp = await axiosSecure.delete(`/blog/${id}`);
      if (resp.data.deletedCount) {
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else {
        toast.error('Something went wrong - please try again!');
      }
    } catch (error) {
      toast.error('Something went wrong - please try again!');
    }
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
        deleteBlog(id);
      }
    });
  };

  return (
    <div onClick={()=>{navigateHandle(data?._id)}} className='pb-32 mx-auto flex justify-center flex-col'>
      <div className='relative group overflow-hidden'>
        <img src={data?.image} alt="" className='w-full rounded-t' />
        {
          showDeleteIcon && (
            <div className='flex  gap-2 px-4 bg-[#aa1936cb] absolute top-0 right-0'>
              <MdDelete onClick={() => deleteHandle(data?._id)} className='text-2xl text-white' />
            </div>
          )
        }
        <p className='bg-[#aa1936cb] px-4 py-2 text-white absolute bottom-0 left-0 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
          September 8, 2020
        </p>
      </div>

     <div className='h-[200px] '>
     <h1 className='font-bold text-2xl mt-6'>{data?.title || 'No Title Provided'}</h1>
     <div className="mt-4 " dangerouslySetInnerHTML={{ __html: postText }} />
     </div>
    </div>
  );
};

SingleBlog.propTypes = {
  data: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
};

export default SingleBlog;
