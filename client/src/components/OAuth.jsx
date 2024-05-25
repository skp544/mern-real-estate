import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInGoogle } from "../api/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const response = await signInGoogle({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      setLoading(false);
      if (!response.success) {
        return toast.error(response.message);
      }
      dispatch(signInSuccess(response.user));
      localStorage.setItem("token", response.token);
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      setLoading(false);
      return toast.error("Could not sign in with Google, Use another method");
    }
  };
  return (
    <button
      className="px-4 py-3 border  gap-2 bg-white border-slate-200 dark:border-slate-700 rounded-lg  dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 flex justify-center items-center text-black hover:scale-105"
      onClick={handleGoogleClick}
      disabled={loading}
      type="button"
    >
      {loading ? (
        "Logging In..."
      ) : (
        <>
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span className=" text-black uppercase">Login with Google</span>
        </>
      )}
    </button>
  );
};

export default OAuth;
