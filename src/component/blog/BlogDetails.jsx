import { useParams } from 'react-router-dom';
import fish from '../../assets/img/fish.jpg';
import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../../hooks/usePublicAxios';
import { MdDelete, MdOutlineDateRange } from 'react-icons/md';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import ColorLoader from '../loader/ColorLoader';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const axiosPublic = usePublicAxios();
  const axiosSecure = useAxiosSecure()

  // Fetch blog details
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['blogsDetails'],
    queryFn: async () => {
      const resp = await axiosPublic.get(`/blogDetails/${id}`);
      return resp?.data;
    },
  });

  if (isLoading) {
    return <ColorLoader />;
  }

  if (isError) {
    return <h1 className="text-red-700 text-center mt-28">Something went wrong! <br /> Please refresh this page</h1>;
  }

  // Delete comment function
  const deleteComment = async ( commentId) => {



    Swal.fire({
      title: 'Are you sure?',
      text: 'This comment will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await axiosSecure.delete(`/blogComment/${data?._id}/${commentId}`);


          console.log(resp);
          if (resp?.data?.modifiedCount > 0) {
            refetch();
            toast.success('Comment deleted successfully!');
          } 
        } catch (error) {
          toast.error('Error deleting comment: ' + error.message);
        }
      }
    });
  };

  // Handle new comment submission
  const commentHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    const comment = e.target.comment.value;
    if (!user) {
      setLoader(false);
      return toast.error('Please login first!');
    }

    const newComment = {
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      commentText: comment,
      commentDate: new Date().toLocaleDateString(),
    };

    try {
      const resp = await axiosPublic.post(`/blogComment/${data?._id}`, newComment);
      if (resp?.data?.modifiedCount > 0) {
        refetch();
        e.target.reset();
        setLoader(false);
        toast.success('Comment submitted successfully!');
      } else {
        toast.error('Something went wrong. Please try again later!');
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="hero min-h-60 bg-fixed" style={{ backgroundImage: `url(${fish})` }}>
        <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
        <div className="hero-content text-neutral-content text-center">
          <div>
            <h1 className="mb-5 text-5xl font-bold">{data?.title}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0">
        <ToastContainer />
        <div className="flex flex-col md:w-[80%] mx-auto justify-center mt-12">
          <img src={data?.image} alt="" className="rounded" />
          <div className="md:pl-8 mt-6">
            <h1 className="text-xl font-bold">{data?.title}</h1>
            <div className="flex gap-4 items-center mt-6">
              <div className="flex gap-2 items-center">
                <MdOutlineDateRange />
                <p>{data?.date.split(',').slice(0, 1)}</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCommentDots />
                <p> {data?.comment.length} Comment</p>
              </div>
            </div>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: data?.postText }} />
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center pb-4 gap-4 pl-8 mt-8">
              <FaRegCommentDots />
              <h1 className="text-2xl font-bold ">{data?.comment.length} Comment</h1>
            </div>
            <div className="max-h-[600px] overflow-y-scroll rounded">
              {data?.comment.map((c, idx) => (
                <div key={idx} className="flex gap-4">
                  <h1 className="mt-8">{idx + 1}.</h1>
                  <div className="border border-black relative w-full mt-6">
                    <div className="flex gap-4 border-b border-black p-4">
                      <div className="flex gap-2 items-center pl-8">
                        <MdOutlineDateRange />
                        <p>{c?.commentDate}</p>
                      </div>
                      <div className="flex gap-2 items-center pl-8">
                        <img src={c?.userPhoto} alt="" className="rounded-full w-10" />
                        <p>{c?.userName}</p>
                      </div>
                      <div className="flex text-right absolute right-0">
                        {c?.userEmail === user?.email && (
                          <MdDelete
                            className="text-red-700 text-2xl"
                            onClick={() => deleteComment(c?._id)} // Send blogId and commentId
                          />
                        )}
                      </div>
                    </div>
                    <h1 className="p-8">{c?.commentText}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave a Comment Section */}
          <div className="md:p-8 mt-8 px-4 md:mt-0 md:px-36">
            <h1 className="text-xl font-bold">Leave a comment</h1>
            <form onSubmit={commentHandler}>
              <div>
                <textarea name="comment" id="" className="w-full mt-4 rounded-lg" required></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loader} className="btn bg-[#aa1936] text-white hover:bg-black">
                  {loader ? 'Loading' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
