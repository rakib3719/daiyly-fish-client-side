import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0); // skip for pagination (default 0)
  const [selectedUser, setSelectedUser] = useState(null); // User being updated
  const [newRole, setNewRole] = useState(""); // New role selected
  const [newMobileNumber, setNewMobileNumber] = useState(""); // New mobile number
  const limit = 15; // limit per page (15 users)

  const { data: usersData, refetch } = useQuery({
    queryKey: ["allUsers", skip, searchTerm],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allUsers?skip=${skip}&limit=${limit}&search=${searchTerm}`);
      return data;
    },
  });

  // Form submit handler for search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setSearchTerm(searchValue);
    setCurrentPage(1);
    setSkip(0);
    refetch();
  };

  const totalUsers = usersData?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setSkip(currentPage * limit);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setSkip((prevPage) => prevPage - limit);
    }
  };

  // Open modal and set selected user
  const handleUpdateClick = (user) => {
    setSelectedUser(user); // Set the user to be updated
    setNewMobileNumber(user.mobileNumber || ""); // Prefill with existing mobile number
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedUser(null); // Clear the selected user
  };

  // Update role and mobile number of the user
  const handleRoleChange = async () => {
    if (newRole && selectedUser) {
      await axiosSecure.put(`/updateUserRole/${selectedUser._id}`, { role: newRole, mobileNumber: newMobileNumber });
      refetch(); // Refetch users after update
      handleCloseModal(); // Close the modal
    }
  };

  return (
    <div className="p-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-4">
        <input
          type="text"
          name="search"
          placeholder="Search by email or name"
          className="border px-4 py-2 w-full rounded-md"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="">
        <table className="max-w-[400px] md:min-w-full overflow-x-scroll bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="text-left py-2 px-4">User Email</th>
              <th className="text-left py-2 px-4">User Name</th>
              <th className="text-left py-2 px-4">User Role</th>
              <th className="text-left py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.users?.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4 whitespace-nowrap">{user.userEmail}</td>
                <td className="py-2 px-4 whitespace-nowrap">{user.userName}</td>
                <td className="py-2 px-4 whitespace-nowrap">{user.userRole}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdateClick(user)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <FaEdit className="mr-2" /> Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md bg-gray-200 ${
            currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md bg-gray-200 ${
            currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>

      {/* Update Role Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
            <h2 className="text-xl font-bold mb-4">Update User Role</h2>
            <p className="mb-4">Updating role for: <strong>{selectedUser.userName}</strong></p>
            
            <label htmlFor="role" className="block mb-2">Select Role:</label>
            <select
              id="role"
              className="border px-4 py-2 w-full mb-4 rounded-md"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="developer">Developer</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>

            {/* Mobile number field */}
            <label htmlFor="mobile" className="block mb-2">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              className="border px-4 py-2 w-full mb-4 rounded-md"
              value={newMobileNumber}
              onChange={(e) => setNewMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allusers;
