import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../hooks/usePublicAxios";


const useFIshCard = () => {
    const recevePagination = (skip, limit)=>{
        return [skip, limit]
    }

    const axiosPublic = usePublicAxios()
    const [skip, limit] = recevePagination()
    const {data:allFish, isLoading, refetch} = useQuery({


        queryKey:['fishCard'],
        queryFn:async ()=>{

            const data =await axiosPublic.get(`/getFish?skip=${skip}&limit=${limit}`)
            return data?.data;

        }
    })
  
    return {allFish, isLoading, refetch, recevePagination,skip,limit}
};

export default useFIshCard;