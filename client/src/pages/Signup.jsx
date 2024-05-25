import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../api/auth";
import { validateUser } from "../utils";
import toast from "react-hot-toast";
import OAuth from "../components/OAuth";
import { motion } from "framer-motion";
import { Footer, Header } from "../components";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateUser(formData);
    if (!validation.ok) {
      return toast.error(validation.error);
    }
    setLoading(true);
    const response = await createUser(formData);
    setLoading(false);

    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    navigate("/sign-in");
  };

  return (
    <section className="h-wrapper w-full  min-h-screen">
      <Header />
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
          transition={{ duration: 0.5 }} // Animation duration
          className="flex-1 flex items-center justify-center h-full"
        >
          <div className="w-[80%]">
            <h1 className=" text-3xl text-center font-semibold my-7">
              Sign Up
            </h1>
            <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                className=" border py-3 px-4 rounded-lg focus:outline-none text-black"
                id="name"
                name="name"
                onChange={handleChange}
                value={name}
                required
              />
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
                      className=" text-slate-600/80 hover:text-slate-600 duration-200 transition-all"
                    />
                  ) : (
                    <AiOutlineEye fontSize={24} className="" />
                  )}
                </span>
              </div>

              <button
                className="button py-3 px- 4 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 "
                disabled={loading}
              >
                {loading ? "Creating User..." : "Sign Up"}
              </button>
              <OAuth />
            </form>
            <div className="flex gap-2 mt-4 text-center">
              <p>Have an account?</p>
              <Link to={"/sign-in"}>
                <span className="text-blue-700 hover:underline">Sign in</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
