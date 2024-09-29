import React, { useContext, useState } from 'react';
import fish from '../../assets/img/fish.jpg';
import { AuthContext } from '../../provider/AuthProvider';
import { imageUpload } from '../../utilites/photoUpload';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ReactQuill from 'react-quill';
import usePublicAxios from '../../hooks/usePublicAxios';
import { useQuery } from '@tanstack/react-query';
import ColorLoader from '../../component/loader/ColorLoader';
import SingleBlog from '../../component/blog/SingleBlog';



const Blog = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
   
    const [value, setValue] = useState('');
    const { user } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const axiosSecure = useAxiosSecure();
    console.log(user);


    const axiosPublic = usePublicAxios()


    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            return toast.info('Please login first!');
        }

        setLoader(true);
        const postText =value;
        const postTitle = e.target.title.value; 
        const postImage = e.target.photo.files[0];

 
    

        try {
            const image = await imageUpload(postImage);
            console.log(image);

            const blog = {
                title: postTitle,
                postText,
                image,
                author: user?.displayName,
                date: new Date().toLocaleString(),
                status: 'pending',
                react: [],
                comment:[],
                authorEmail: user?.email

            };

            const resp = await axiosSecure.post('/blog', blog);
            console.log(resp);
if(resp?.data?.insertedId
){

    setLoader(false)
    setShowModal(false);
    e.target.reset()
    refetch()
    setValue("")
    toast.success("Sucess! Please wait for aproval...")
    
}

          
            
        } catch (error) {
            toast.error(error.message);
            setLoader(false);
        }

        // Clear the form and close the modal
     
        
        
      
    };
    

    const {data:totalBlogs, } = useQuery({
        queryKey:['countBlogs'],
        queryFn:async()=>{
    
            const resp = await axiosPublic.get('/blogCount');
           return resp?.data
        }
    })

   
const countBlogs = totalBlogs?.count;
const perPage = 9;
const totalPage = Math.ceil(countBlogs / perPage)
const skip = perPage * (currentPage - 1 )
const limit = perPage

const {data, isLoading, isError, refetch} = useQuery({


    queryKey:['blogs', currentPage],
    queryFn:async()=>{

const resp = await axiosPublic.get(`/blog?skip=${skip}&limit=${limit}`)
return resp?.data;

    }
})

const isNoData = !data || data.length === 0;


if(isError){
    return <h1>Something went wrong! please refresh the page</h1>
}







    return (
        <div>
            {/* Hero Section */}
            <div
                className="hero min-h-60 bg-fixed"
                style={{
                    backgroundImage: `url(${fish})`,
                }}>
                <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-bold">Blogs</h1>
                    </div>
                </div>
            </div>

            <ToastContainer></ToastContainer>

            {/* Post Button */}
            <div className="mt-10 sm:w-[70%] mx-auto md:w-[50%]">
                <div
                    className="bg-white p-4 rounded-md shadow-md border border-gray-200 flex items-center justify-between cursor-pointer"
                    onClick={() => setShowModal(true)}>
                    <img
                        src={user?.photoURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 mx-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-full">
                        Write a blog...
                    </div>
                    <div className="text-gray-400">
                        <i className="fas fa-photo-video"></i>
                    </div>
                </div>
            </div>

{
    
    
  !isLoading ?  <div className='mt-16 px-8 grid md:px-24  md:grid-cols-3 justify-center gap-14'>

{
    data?.map(data => <SingleBlog 
    
    key={data._id}
    data={data}
    refetch={refetch}
    
    />)
}



</div> : <ColorLoader/>}

<div>


{!isNoData && (
                <div className="flex justify-center items-center mx-auto mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="join-item btn btn-outline"
                    >
                        Previous page
                    </button>

                    {Array.from({ length: totalPage }, (_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={idx + 1 === currentPage ? "join-item btn bg-[#aa1936] hover:bg-[#aa1936] text-white" : "join-item btn hover:bg-[#aa1936] hover:text-white"}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="join-item btn btn-outline"
                    >
                        Next
                    </button>
                </div>
            )}
</div>
            {/* Modal for Creating Post */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)} // Close modal on click
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#aa1936]">Create Post</h2>
                        </div>

                        <form onSubmit={handlePostSubmit}>
                            {/* Title Input Field */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Blog Title"
                                    className="input input-bordered w-full"
                                  
                                  
                                    required
                                />
                            </div>

                            <div className='max-h-[300px] overflow-y-scroll'>

                            <ReactQuill theme="snow"  value={value} onChange={setValue} />;
                            </div>

                            {/* Post Text */}
                            

                            {/* Post Image */}
                            <div className="mb-4">
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                   
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-right">
                                <button type="submit"
                                disabled={loader}
                                className={`btn bg-[#aa1936] text-white ${loader && "cursor-not-allowed "}`}>
                             {loader ? "loading..." : "Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
