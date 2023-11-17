import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, signOut, updateUser } from "../api/auth";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/slices/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
        setFilePerc(Math.floor(progress));
      },
      (error) => {
        setFileUploadError(true);
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

  // const handleDeleteUser = async () => {
  //   try {
  //   } catch (error) {
  //     dispat;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    const response = await updateUser(
      currentUser.id || currentUser._id,
      formData
    );

    if (!response.success) {
      dispatch(updateUserFailure(response.message));
      return toast.error(response.message);
    }

    dispatch(updateUserSuccess(response.updatedUser));
    toast.success(response.message);
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());

    const response = await deleteUser();

    if (!response.success) {
      dispatch(deleteUserFailure(response.message));
      return toast.error(response.message);
    }

    dispatch(deleteUserSuccess());
    toast.success(response.message);
    localStorage.clear("token");
    localStorage.removeItem("token");

    navigate("/sign-up");
  };

  const handleSignOut = async () => {
    dispatch(signOutUserStart());

    const response = await signOut();

    if (!response.success) {
      dispatch(signOutUserFailure());
      return toast.error(response.message);
    }

    dispatch(deleteUserSuccess());
    toast.success(response.message);
    localStorage.clear("token");
    navigate("/sign-in");
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7 ">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          placeholder="Enter Name"
          className="text-box-style"
          id="name"
          name="name"
          onChange={handleChange}
          defaultValue={currentUser.name}
          // value={name}
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
        <button className=" bg-slate-700 text-white px-4 py-2 uppercase hover:opacity-95 disabled:opacity-80 rounded-md transition-all duration-200">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5 ">
        <span className=" text-red-700 cursor-pointer ">Delete Account</span>
        <span className=" text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
