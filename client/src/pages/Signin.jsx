import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { signInUser } from "../api/auth";
import { isValidEmail } from "../utils";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slices/userSlice";
import { OAuth } from "../components";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    const response = await signInUser(formData);

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
    <div className="mt-24 p-3 max-w-lg mx-auto ">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          className="text-box-style"
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
            className="text-box-style w-full"
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

        <button className=" bg-slate-700 text-white py-3 px- 4 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 duration-200 transition-all">
          Sign In
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-4 text-center">
        <p>Don&apos;t have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
