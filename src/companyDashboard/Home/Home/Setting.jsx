import { useState } from "react";

import { imageUpload } from "../../../utilites/photoUpload"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Setting = () => {
  const [selectedBanner, setSelectedBanner] = useState("default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customBanner, setCustomBanner] = useState(null);
  const [selectedFont, setSelectedFont] = useState("font1");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [bannerImageUrl, setBannerImageUrl] = useState(""); // Store uploaded image URL

  const handleBannerChange = (e) => {
    const value = e.target.value;
    if (value === "customize" && isImageUploaded) {
      setSelectedBanner(value);
    } else {
      setSelectedBanner("default");
    }
    if (value === "customize") {
      setIsModalOpen(true);
    }
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const photo = e.target.files[0];
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomBanner(reader.result);
      };
      reader.readAsDataURL(photo);
      setIsImageUploaded(true);

      // Upload image to server and get the URL
      const image_url = await imageUpload(photo); // Assuming this uploads and returns image URL
      setBannerImageUrl(image_url); // Store the uploaded image URL for backend use
    }
  };
  const axiosSecure = useAxiosSecure()

  const handleSubmit = async () => {
    setIsModalOpen(false);
    setSelectedBanner("customize");

    try {
      // Prepare data for backend
      const data = {
        bannerImg: bannerImageUrl, // Send uploaded image URL
        font: selectedFont,
      };

      // Send a PUT request to the backend
      const response = await axiosSecure.put("/setting", data);

      console.log("Settings updated successfully:", response.data);
      alert("Settings have been updated!");
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Banner Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Banner</h2>
        <div className="flex items-center gap-4 mt-2">
          <label>
            <input
              type="radio"
              name="banner"
              value="default"
              checked={selectedBanner === "default" && !isImageUploaded}
              onChange={handleBannerChange}
            />{" "}
            Default
          </label>
          <label>
            <input
              type="radio"
              name="banner"
              value="customize"
              checked={selectedBanner === "customize" && isImageUploaded}
              onChange={handleBannerChange}
            />{" "}
            Customize
          </label>
        </div>

        {/* Show selected custom banner */}
        {selectedBanner === "customize" && customBanner && (
          <div className="mt-4">
            <img
              src={customBanner}
              alt="Custom Banner"
              className="w-64 h-32 object-cover border"
            />
          </div>
        )}
      </div>

      {/* Font Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Font</h2>
        <select
          value={selectedFont}
          onChange={handleFontChange}
          className="mt-2 p-2 border rounded"
        >
          <option value="font1">Roboto</option>
          <option value="font2">Open Sans</option>
          <option value="font3">Lato</option>
        </select>
      </div>

      {/* Modal for uploading custom banner */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Upload Custom Banner</h2>
            <input type="file" onChange={handleImageUpload} className="mb-4" />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isImageUploaded}
                className={`px-4 py-2 rounded-md text-white ${
                  isImageUploaded
                    ? "bg-[#aa1936] hover:bg-[#880d28]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
