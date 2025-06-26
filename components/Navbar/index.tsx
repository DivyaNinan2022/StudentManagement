"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { Home, Menu, Search, User, X, Loader } from "lucide-react";
import "../../css/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingNavBar, toggleNavBar } from "@/redux/navbarSlice";
import { RootState } from "@/redux/store";
import { clearUserData } from "@/redux/signUpSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.navbar);

  const handleToggle = () => {
    dispatch(toggleNavBar(!isOpen));
  };

  const handleLogOut = () => {
    localStorage.clear();
    Cookies.remove("Username");
    dispatch(clearUserData());
  };

  const handleClick = () => {
    dispatch(setLoadingNavBar(true));
  };

  const user = Cookies.get("Username") || "";

  return (
    <nav className={`${isOpen ? "navbar" : "navbar-closed"}`}>
      <button className="menu-toggle" onClick={handleToggle}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen ? (
        <>
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li>
              <Link href="/dashboard" prefetch={true} onClick={handleClick}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/tasklist" prefetch={null} onClick={handleClick}>
                Tasks
              </Link>
            </li>
            <li>
              <Link href="/add_task_tms" prefetch={null} onClick={handleClick}>
                Add Task
              </Link>
            </li>
            <li>
              <Link href="/login" prefetch={null} onClick={handleLogOut}>
                Log Out
              </Link>
            </li>
          </ul>
          <span style={{ float: "right" }}>
            <label>Welcome {user}</label>
          </span>
        </>
      ) : (
        <span style={{ float: "right" }}>
          <label>Welcome {user}</label>
          <button className="px-4 py-1 mx-4 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">
            <Link
              href="/login"
              prefetch={false}
              onClick={handleLogOut}
              className="login-link text-sm"
            >
              Log Out
            </Link>
          </button>
        </span>
      )}
    </nav>
  );
};

export default NavBar;
