"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SignUpData, signUpFnSlice } from "@/redux/signUpSlice";
import { AppDispatch, RootState } from "@/redux/store";

type LoginData = {
  email: string;
  username: string;
  password: string;
  repassword: string;
};

// Validation schema using Yup
const signupSchema = yup.object({
  username: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  repassword: yup.string()?.required("Confirm passord is required"),
});

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.signUp);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: LoginData) => {
    console.log(data.repassword, "passs", data.password);
    if (data.password !== data.repassword) {
      setError("password", {
        type: "required",
        message: "Passwords do not match",
      });
      return;
    }
    // Remove repassword field before dispatching
    const { repassword, ...modifiedData } = data;
    dispatch(signUpFnSlice(data));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("username")}
              type="text"
              className="mt-1 w-full border p-2 rounded"
              placeholder="Your name"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full border p-2 rounded"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 w-full border p-2 rounded"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium">
              Re Enter Password
            </label>
            <input
              {...register("repassword")}
              type="repassword"
              className="mt-1 w-full border p-2 rounded"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
