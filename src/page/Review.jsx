import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import useGetUser from "../hooks/useGetUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ButtonLoader from "../component/loader/ButtonLoader";
import { useQuery } from "@tanstack/react-query";
import ColorLoader from "../component/loader/ColorLoader";
import usePublicAxios from "../hooks/usePublicAxios";
import fish from '../assets/img/fish.jpg';

const Review = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0); // For dynamic rating
  const [comment, setComment] = useState(""); // To store the comment
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [reviewToDelete, setReviewToDelete] = useState(null); // Review ID to delete
  const { user } = useContext(AuthContext);
  const { userData } = useGetUser();
  const axiosSecure = useAxiosSecure();
  const [loader, setLoader] = useState(false);
  const axiosPublic = usePublicAxios()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["review", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/review?page=${currentPage}&limit=5`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <ColorLoader />;
  }

  const { result: allReview, totalCount } = data;
  const totalPages = Math.ceil(totalCount / 5);

  const toggleModal = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleRating = (rating) => {
    setSelectedRating(rating);
    console.log(`Selected Rating: ${rating}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const reviewDetails = {
      comment,
      rating: selectedRating,
      email: user?.email,
      name: userData?.userName,
      photo: userData?.userPhoto,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
      const res = await axiosSecure.post(`/review`, reviewDetails);
      console.log(res, "review");
      if (res?.data?.insertedId) {
        toast.success("Review submitted successfully");
        setLoader(false);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
    }

    // Close the modal after logging the values
    toggleModal();
  };

  const handleDelete = (reviewId) => {
    setReviewToDelete(reviewId); // Set the review ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = async () => {
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
    try {
      const res = await axiosSecure.delete(`/review/${reviewToDelete}`);
      if (res?.data?.deletedCount > 0) {
        toast.info("Delete success");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the delete confirmation modal without deleting
  };

  return (



    <div>

<div
    className="hero min-h-60 bg-fixed"
    style={{
        backgroundImage: `url(${fish})`,
    }}>
    <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
    <div className="hero-content text-neutral-content text-center">
        <div className="">
            <h1 className="mb-5 text-5xl font-bold">Drop Your review</h1>
        </div>
    </div>
</div>
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Customer Reviews
      </h2>
      <button
        onClick={toggleModal}
        className="bg-[#aa1936] text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300 mb-6"
      >
        Add Review
      </button>

      {/* Review Section */}
      {allReview.map((review, index) => (
        <div
          key={index}
          className="bg-white p-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
             <div className="flex gap-4 items-center">
              <img src={review?.photo} alt="" className="rounded-full w-8"/>
             <h3 className="text-xl font-semibold text-gray-800">
                {review?.name}
              </h3>
             </div>
              <p className="text-gray-500 ml-12 text-sm">{review?.date}</p>

              {["owner", "manager", "developer", "employee"].includes(userData?.userRole) && (
                <>
                  {user?.email === review?.email && (
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      Delete
                    </button>
                  )}
                  <p className="text-gray-500 text-sm mt-2">Email: {review?.email}</p>
                </>
              )}
            </div>
            <div className="flex items-center">
              {[...Array(review?.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.171 3.592a1 1 0 00.95.69h3.772c.969 0 1.371 1.24.588 1.81l-3.053 2.217a1 1 0 00-.364 1.118l1.17 3.592c.3.921-.755 1.688-1.539 1.118l-3.054-2.217a1 1 0 00-1.176 0l-3.053 2.217c-.784.57-1.838-.197-1.539-1.118l1.17-3.592a1 1 0 00-.364-1.118L2.538 8.019c-.783-.57-.381-1.81.588-1.81h3.772a1 1 0 00.95-.69l1.171-3.592z" />
                </svg>
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.171 3.592a1 1 0 00.95.69h3.772c.969 0 1.371 1.24.588 1.81l-3.053 2.217a1 1 0 00-.364 1.118l1.17 3.592c.3.921-.755 1.688-1.539 1.118l-3.054-2.217a1 1 0 00-1.176 0l-3.053 2.217c-.784.57-1.838-.197-1.539-1.118l1.17-3.592a1 1 0 00-.364-1.118L2.538 8.019c-.783-.57-.381-1.81.588-1.81h3.772a1 1 0 00.95-.69l1.171-3.592z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      ))}

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-[#aa1936] text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300 mr-2"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page + 1 ? "bg-[#aa1936] text-white" : "bg-gray-200 text-gray-800"
            } hover:bg-blue-500 hover:text-white transition duration-300 mx-1`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="bg-[#aa1936] text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300 ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add Review</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="comment">
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <svg
                      key={rating}
                      onClick={() => handleRating(rating)}
                      className={`w-6 h-6 cursor-pointer ${rating <= selectedRating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.171 3.592a1 1 0 00.95.69h3.772c.969 0 1.371 1.24.588 1.81l-3.053 2.217a1 1 0 00-.364 1.118l1.17 3.592c.3.921-.755 1.688-1.539 1.118l-3.054-2.217a1 1 0 00-1.176 0l-3.053 2.217c-.784.57-1.838-.197-1.539-1.118l1.17-3.592a1 1 0 00-.364-1.118L2.538 8.019c-.783-.57-.381-1.81.588-1.81h3.772a1 1 0 00.95-.69l1.171-3.592z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="bg-[#aa1936] text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                >
                  {loader ? <ButtonLoader /> : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this review?</p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Review;
