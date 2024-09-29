import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import SingleFishCard from "./SingleFishCard";
import { useState } from "react";
import ColorLoader from "../loader/ColorLoader";

const FishCard = () => {
    const axiosPublic = usePublicAxios();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");

    // Fetch total fish count with search and filter
    const { data: totalFishLength, isLoading: countLoading } = useQuery({
        queryKey: ['fishLength', filter, search],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/countFish?type=${filter}&search=${search}`);
            return data?.count;
        }
    });

    const pagesNumber = !countLoading && Math.ceil(totalFishLength / limit);
    const skip = limit * (currentPage - 1);

    // Fetch fish data with search, filter, and pagination
    const { data: allFish, isLoading, isError } = useQuery({
        queryKey: [currentPage, limit, filter, search],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/getFishTwo?skip=${skip}&limit=${limit}&type=${filter}&search=${search}`);
            return data?.data;
        },
        enabled: !!totalFishLength
    });

    const searchHandle = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
        setCurrentPage(1); // Reset to first page when searching
    };

  

    // Check if allFish is empty or has a length of zero
    const isNoFishData = !allFish || allFish.length === 0;

    return (
        <div className="px-4 lg:px-8 mt-28">
            {/* Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-[#aa1936]">Fish Collection</h2>
            </div>

            {/* Search and Filter Section */}
            <div className="flex mt-16 flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-4 justify-between">
                {/* Search Form */}
                <form onSubmit={searchHandle} className="relative max-w-sm md:flex-grow">
                    <div className="flex items-center relative max-w-sm rounded-full duration-300">
                        <input
                            type="text"
                            name="search"
                            defaultValue={search}
                            placeholder="🔍 Search for fish..."
                            className="w-full py-3 pl-12 pr-4 rounded-md text-gray-600 focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#aa1936] transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 bottom-0 bg-[#aa1936] hover:bg-[#8f142c] text-white px-5 py-2 rounded-r-md transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Filter Dropdown */}
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <label htmlFor="filter" className="font-semibold text-gray-700 hidden md:block">Filter by Type:</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1); // Reset to first page when filtering
                        }}
                        className="w-full md:w-auto p-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#aa1936] transition-all duration-300"
                    >
                        <option value="">All Types</option>

                        <option value="shutki">শুটকি</option>
                        <option value="has">হাঁস-মুরগী


                        </option>
                        <option value="সামুদ্রিক">সামুদ্রিক মাছ</option>
                        <option value="হাওড়">হাওড়ের মাছ</option>
                        <option value="নদী">নদীর মাছ</option>
                    </select>
                </div>
            </div>

            {/* Fish Card Grid */}
         { !isLoading  ?  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFish && allFish.map(fish => (
                    <SingleFishCard key={fish._id} allFish={fish} />
                ))}
            </div> : <ColorLoader/>}

            {/* No Data Found Message */}
            {isError && (
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-red-700 mt-28">
                    No data found! Please reload this page...
                </h2>
            )}

            {/* Pagination */}
            {!isNoFishData && (
                <div className="flex justify-center items-center mx-auto mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="join-item btn btn-outline"
                    >
                        Previous page
                    </button>

                    {Array.from({ length: pagesNumber }, (_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={idx + 1 === currentPage ? "join-item btn bg-[#aa1936] hover:bg-[#aa1936] text-white" : "join-item btn hover:bg-[#aa1936] hover:text-white"}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === pagesNumber}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="join-item btn btn-outline"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default FishCard;
