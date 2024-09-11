import axios from "axios";

const publicAxios = axios.create({

    baseURL:'https://daily-fish-server-side.vercel.app'
    // baseURL:'http://localhost:5000'
    

})
const usePublicAxios = () => {
  return publicAxios
};

export default usePublicAxios;