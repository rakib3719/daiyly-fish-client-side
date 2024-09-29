
import { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon from react-icons
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';
import { imageUpload } from '../utilites/photoUpload';
import usePublicAxios from '../hooks/usePublicAxios';

const RegistrationPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };
  const  {registar, updateUser, loginWithGoogle} = useContext(AuthContext)
const [regloader, setRegloader] = useState(false)
const navigate = useNavigate()

const googleLogin = async()=> {
  try{
  
    await loginWithGoogle()
    toast.success("Login Success")
    setTimeout(() => {
      navigate('/')
    }, 2000);
  
  }catch(err){
    toast.error(err.message)
  }
    }
    const axiosPublic = usePublicAxios()

const saveUser = async(userInfo)=>{


try {
   await axiosPublic.post('/saveUser', userInfo)
} catch (error) {
  return toast.error(error.message)
}
 


}

  const registarHandle =async e =>{
    setRegloader(true)

e.preventDefault()

const form = e.target;
const name = form.name.value;
const email = form.email.value;
const password = form.password.value;
const confirmPassword = form.confirmPassword.value;
const photo = form.photo.files[0] || null;



if(password.length < 6){
  toast.error("Password should be at least 6 characters");
setRegloader(false)
  return
    }

    if(password !== confirmPassword){
      toast.error('Confirm password did not match')
      setRegloader(false)
      return
    }


try{

  const image_url = await imageUpload(photo)
  console.log(image_url)


  const userInfo = {

    userName : name,
    userEmail: email,
    userPhoto : image_url,
    userRole: "user"

  }
  await saveUser (userInfo)

  //2. User Registration
  const result = await registar(email, password)
  console.log(result)

  // 3. Save username and photo in firebase
  await updateUser(name, image_url)

 

  setRegloader(false)
toast.success('Regestration Sucessfully')
setTimeout(() => {
  navigate('/')
}, 2000);


}catch(err){
toast.error(err.message)
setRegloader(false)
}


}
  return (
    <div className="min-h-screen mt-8 flex items-center justify-center bg-gray-100">
      <ToastContainer></ToastContainer>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form onSubmit={registarHandle} className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              id="photo-upload"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#aa1936] file:text-white hover:file:bg-indigo-700"
            />
          </div>

          {selectedFile && (
            <div className="mt-4">
              <img src={selectedFile} alt="Selected" className="w-32 h-32 object-cover rounded-full mx-auto" />
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#aa1936] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
          {  regloader? "Loading...":  "Register"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
            </Link>
          </p>
        </div>
        <div onClick={googleLogin} className="mt-4 flex justify-center items-center space-x-2 border-2 p-2 hover:bg-gray-200">
          <FcGoogle size={28} />
          <span className="text-sm cursor-pointer font-medium text-gray-900">Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
