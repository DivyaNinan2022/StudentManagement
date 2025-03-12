"use client";

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
    dispatch(clearUserData());
  };

  const handleClick = () => {
    dispatch(setLoadingNavBar(true));
  };

  return (
    <nav className={`${isOpen ? "navbar" : "navbar-closed"}`}>
      <button className="menu-toggle" onClick={handleToggle}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen ? (
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link href="/" prefetch={true} onClick={handleClick}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/tasklist" prefetch={true} onClick={handleClick}>
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/add_task_tms" prefetch={true} onClick={handleClick}>
              Add Task
            </Link>
          </li>
          <li>
            <Link href="/login" prefetch={true} onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link href="/login" prefetch={true} onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
