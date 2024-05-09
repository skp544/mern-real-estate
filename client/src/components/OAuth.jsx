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
      className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 flex  items-center justify-center gap-2"
      onClick={handleGoogleClick}
      disabled={loading}
      type="button"
    >
      {loading ? (
        "Logging In..."
      ) : (
        <>
          <AiFillGoogleCircle className="w-6 h-6 mr-2 text-white" />
          Continue with Google
        </>
      )}
    </button>
  );
};

export default OAuth;
