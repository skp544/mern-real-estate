import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { signInUser } from "../api/auth";
import { isValidEmail } from "../utils";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slices/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());

    if (!isValidEmail(formData.email)) {
      return toast.error("Email is invalid!");
    }

    setLoading(true);

    const response = await signInUser(formData);
    setLoading(false);

    if (!response.success) {
      dispatch(signInFailure(response.message));
      return toast.error(response.message);
    }

    dispatch(signInSuccess(response.user));

    localStorage.setItem("token", response.token);

    toast.success(response.message);
    navigate("/");
  };

  return (
    // <section className="mt-24 p-3 max-w-lg mx-auto hero-wrapper">
    <section className=" h-wrapper w-full pt-20 min-h-screen">
      <div className="paddings innerWidth flexCenter !justify-between !p-2 !gap-2 ">
        <div className="flexCenter w-[50%] sm:!flex !hidden">
          <motion.div
            className="image-container"
            initial={{ x: "-7rem", opacity: 0 }} // Initial position (left side)
            animate={{ x: 0, opacity: 1 }} // Animation to move to the center
            transition={{
              duration: 2,
              type: "spring",
            }}
          >
            <img src="./hero-image.png" alt="hero image" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }} // Initial position (right side)
          animate={{ opacity: 1, x: 0 }} // Animation to move to the center
          transition={{ duration: 0.8 }} // Animation duration
          className="flex-1 flex items-center justify-center h-full"
        >
          <div className=" w-[80%]">
            <h1 className=" text-3xl text-center font-semibold my-7">
              Sign In
            </h1>
            <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Email"
                className="text-box-style text-black"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  className="text-box-style w-full text-black"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[14px] z-[10] cursor-pointer"
                >
                  {!showPassword ? (
                    <AiOutlineEyeInvisible
                      fontSize={24}
                      className=" text-black duration-200 transition-all"
                    />
                  ) : (
                    <AiOutlineEye fontSize={24} className="text-black" />
                  )}
                </span>
              </div>

              <button
                className="button py-3 px- 4 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 "
                disabled={loading}
              >
                {loading ? "Logging.." : "Login"}
              </button>
              <OAuth />
            </form>
            <div className="flex gap-2 mt-4 text-center">
              <p>Don&apos;t have an account?</p>
              <Link to={"/sign-up"}>
                <span className="text-blue-500 hover:underline">Sign up</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Signin;
