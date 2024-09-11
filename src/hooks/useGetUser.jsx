import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";



const useGetUser = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email;

    const { data:userData, isLoading } = useQuery(
    {  queryKey:  ['userDataGet', email],
       queryFn: async () => {
            const res = await axiosSecure.get(`/getUser/${email}`);
            return res?.data;
        },
        
            enabled: !!user
        }
    );

    return   {userData, isLoading};
};

export default useGetUser;
