import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUserListings, signOut, updateUser } from "../api/auth";
import { deleteListing } from "../api/listing";
import { app } from "../firebase";
import {
  deleteUserSuccess,
  signInSuccess,
  signOutUserFailure,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/slices/userSlice";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});

  const [userListing, setUserListing] = useState([]);

  const fileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        toast.error(" Error Image upload (image must be less than 2 mb)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          toast.success("Photo Uploaded successfully");
          setFile(undefined);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await updateUser(
      currentUser.id || currentUser._id,
      formData
    );

    setLoading(false);

    if (!response.success) {
      return toast.error(response.message);
    }
    dispatch(signInSuccess(response.updatedUser));

    toast.success(response.message);
  };

  const handleDeleteUser = async () => {
    const response = await deleteUser(currentUser.id || currentUser._id);

    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    localStorage.clear("token");
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handleSignOut = async () => {
    const response = await signOut();

    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    localStorage.clear("token");
    navigate("/sign-in");
  };

  const handleShowListings = async () => {
    const res = await getUserListings(currentUser._id || currentUser.id);

    if (!res.success) {
      return toast.error(res.message);
    }

    if (res.listings === 0 || res.listing === undefined) {
      return toast.error("You have no properties");
    }

    setUserListing([...res.listings]);
  };

  const handleListingDelete = async (id) => {
    const res = await deleteListing(id);

    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);

    handleShowListings();
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-900">
      <img
        src="/house.jpg"
        alt="home"
        className="absolute inset-0 object-cover w-full h-full opacity-40"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative p-6 bg-white/20 rounded-2xl shadow-lg max-w-lg w-full backdrop-blur-md">
        <h1 className="text-3xl font-semibold text-center my-7 text-white">
          User Profile
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <div className="relative self-center flex items-end justify-center">
            <img
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
              onClick={() => fileRef.current.click()}
            />
            <span className="absolute">
              <FaCamera
                onClick={() => fileRef.current.click()}
                className="cursor-pointer"
              />
            </span>
          </div>
          <input
            type="text"
            placeholder="Enter Name"
            className="text-box-style"
            id="name"
            name="name"
            onChange={handleChange}
            defaultValue={currentUser.name}
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="text-box-style"
            id="email"
            name="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="******"
            className="text-box-style"
            id="password"
            name="password"
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white px-4 py-2 uppercase hover:opacity-95 disabled:opacity-80 rounded-full transition-all duration-200 hover:scale-105">
            {loading ? "Updating..." : "Update"}
          </button>
          <Link
            className="bg-amber-300 text-white p-3 rounded-full uppercase text-center hover:opacity-95 transition-all duration-200 hover:scale-105"
            to={"/create-property"}
          >
            Create Listing
          </Link>
        </form>

        <div className="flex justify-between mt-5">
          <span
            className="bg-red-700 py-1 px-3 rounded-md duration-200 transition-all text-white cursor-pointer hover:scale-110"
            onClick={handleDeleteUser}
          >
            Delete Account
          </span>
          <span
            className="bg-red-500 text-white cursor-pointer py-1 px-3 rounded-md duration-200 transition-all hover:scale-110"
            onClick={handleSignOut}
          >
            Sign Out
          </span>
        </div>

        <button
          onClick={() => navigate("/user-property")}
          className="text-blue-500 w-full mt-4 border-[3px] border-blue-500 text-center rounded-full px-6 py-2 hover:bg-blue-500 transition-all duration-200 hover:text-white hover:scale-105"
        >
          Show Property
        </button>

        {userListing && userListing.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-center mt-7 text-2xl font-semibold">
              Your Properties
            </h2>

            {userListing.map((listing) => (
              <div
                className="border border-gray-400 rounded-lg p-3 flex justify-between items-center gap-4"
                key={listing._id}
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
