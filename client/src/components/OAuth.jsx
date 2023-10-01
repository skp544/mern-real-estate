import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInGoogle } from "../api/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const response = await signInGoogle({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      if (!response.success) {
        return toast.error(response.message);
      }

      dispatch(signInSuccess(response.user));
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      console.log("Could not sign in with google");
    }
  };
  return (
    <button
      className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      onClick={handleGoogleClick}
      type="button"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
