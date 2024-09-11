import axios from "axios";

const axiosSecure = axios.create({

    // baseURL:'http://localhost:5000',
    baseURL:'https://daily-fish-server-side.vercel.app',
    withCredentials: true
    
        })
const useAxiosSecure = () => {
   

axiosSecure.interceptors.response.use((response)=> {

    return response
},
async(err)=>{

//     if(err.response.status === 401 || err.response.status === 401){

// alert('logOut')

//     }
    return err.response

}

)
    return axiosSecure;
};

export default useAxiosSecure;