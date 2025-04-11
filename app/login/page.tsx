"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  clearError,
  getLoginDetails,
  loginSelector,
  setPermission,
} from "@/redux/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { error, loading, userData, permission } = useSelector(loginSelector);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = (email: string): boolean => emailRegex.test(email);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
    dispatch(clearError());
    setErrors("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrors("");
    if (!email || !password) {
      setErrors("Email and password are required");
      return;
    }
    if (!isValidEmail(email)) {
      setErrors("Please enter a valid email");
      return;
    }
    setSubmitted(true);
    dispatch(getLoginDetails({ email, password })).then((res: any) => {
      if (res?.error) {
        setSubmitted(false);
      }
    });
  };

  // ✅ **Redirect when userData is available**
  useEffect(() => {
    if (userData?.email) {
      // Set a cookie named 'token' with a value 'valid-token'
      // 'path=/' ensures the cookie is available on all pages
      document.cookie = "token=valid-token; path=/";

      // Redirect the user to the protected dashboard page
      router.push("/dashboard");
      const permissionVal = userData?.permission
        ? userData?.permission?.toString()
        : "5";
      localStorage.setItem("LoginUserPermission", permissionVal);
      Cookies.set("LoginUserPermission", permissionVal, { expires: 7 });
      dispatch(setPermission(permissionVal));
      if (rememberMe) {
        localStorage.setItem("LoginUser", userData?.email);
      } else {
        localStorage.removeItem("LoginUser");
      }
      toast.success("Success!");
      Cookies.set("UserEmail", userData?.email, { expires: 7 });
      localStorage.setItem("Username", userData?.username);
      router.replace("/dashboard");
    }
  }, [userData, rememberMe, router]);

  useEffect(() => {
    if (error || errors) {
      toast.error(error || errors);
    }
  }, [error, errors]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {(error || errors) && (
          <p className="text-red-500 text-sm mb-4">{error || errors}</p>
        )}

        {loading || submitted ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
                value={email}
                onChange={(e) => handleInput(e, "email")}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
                value={password}
                onChange={(e) => handleInput(e, "password")}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <a href="#" className="text-blue-500 text-sm">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
            >
              Login
            </button>
            <div className="mt-3">
              <p>
                Dont have an account?{" "}
                <Link
                  href="/signup"
                  prefetch={false}
                  className="signup-link text-blue-500 text-sm"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
