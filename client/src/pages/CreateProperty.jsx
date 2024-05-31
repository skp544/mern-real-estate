import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createListing } from "../api/listing";
import { app } from "../firebase";
import { motion } from "framer-motion";

const CreateProperty = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
        })
        .catch((err) => {
          toast.error("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      toast.error("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1)
      return toast.error("You must upload at least one image");
    if (+formData.regularPrice < +formData.discountPrice)
      return toast.error("Discount price must be lower than regular price");
    setLoading(true);

    formData.userRef = currentUser.id || currentUser._id;
    const { success, message, listing } = await createListing(formData);

    if (!success) {
      setLoading(false);
      return toast.error(message);
    }

    toast.success(message);
    setLoading(false);

    navigate(`/properties/${listing._id}`);
  };

  return (
    <motion.div
      className="relative min-h-screen bg-gray-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-black  z-0 opacity-40"></div>
      <img
        src="/house.jpg"
        alt="home"
        className="absolute inset-0 object-cover w-full h-full z-0 "
      />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1,
        }}
        className="relative p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg z-10 bg-opacity-40 my-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Create a Property
        </h1>
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Property Name"
              className="w-full p-3 border rounded-lg shadow-sm"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Property Description"
              className="w-full p-3 border rounded-lg shadow-sm resize-none"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border rounded-lg shadow-sm"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                Sell
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                Rent
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                Parking spot
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                Furnished
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                Offer
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="bedrooms"
                  className="text-gray-900 font-semibold"
                >
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border rounded-lg shadow-sm"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="bathrooms"
                  className="text-gray-900 font-semibold"
                >
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border rounded-lg shadow-sm"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="regularPrice"
                  className="text-gray-900 font-semibold"
                >
                  Regular Price
                </label>
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border rounded-lg shadow-sm"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <span className="text-black ">
                  {formData.type === "rent" ? "/ Month" : ""}
                </span>
              </div>
              {formData.offer && (
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="discountPrice"
                    className="text-gray-900 font-semibold"
                  >
                    Discount Price
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border rounded-lg shadow-sm"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <span className="text-gray-900">$</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="images"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              accept=".jpg,.png,.jpeg"
              multiple
              required
            />
            {files.length > 0 && (
              <button
                type="button"
                onClick={handleImageSubmit}
                className="bg-orange-primary hover:scale-105 duration-200 transition-all text-white py-2 px-4 rounded-lg shadow-md"
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            )}
            <div className="flex gap-4 flex-wrap">
              {formData.imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative w-32 h-32">
                  <img
                    src={imageUrl}
                    alt="property"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-secondary text-white py-2 px-4 rounded-lg shadow-md hover:scale-110 duration-200 transition-all"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create Listing"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default CreateProperty;
