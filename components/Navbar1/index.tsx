"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import "../../css/navbar1.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingNavBar, toggleNavBar } from "@/redux/navbarSlice";
import { RootState } from "@/redux/store";
import { clearUserData } from "@/redux/signUpSlice";

const NavBar1 = () => {
  const dispatch = useDispatch();
  // const { isOpen } = useSelector((state: RootState) => state.navbar);

  // const handleToggle = () => {
  //   dispatch(toggleNavBar(!isOpen));
  // };

  const handleLogOut = () => {
    localStorage.clear();
    Cookies.remove("Username");
    dispatch(clearUserData());
  };

  // const handleClick = () => {
  //   dispatch(setLoadingNavBar(true));
  // };

  const user = Cookies.get("Username") || "";

  return (
    <nav className="navbar">
      {/* <button className="menu-toggle" onClick={handleToggle}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}

      <>
        <ul className={`nav-links open`}>
          <li>
            <Link href="/dashboardStudent" prefetch={true}>
              Home
            </Link>
            
          </li>
          <li>
            <Link href="/student" prefetch={null}>
              Details
            </Link>
          </li>
          <li>
            <Link href="/bankTransaction" prefetch={null}>
              Bank Details
            </Link>
          </li>
           <li>
            <Link href="/directors_details" prefetch={null}>
              Director Details
            </Link>
          </li>
          <li>
            <Link href="/login" prefetch={null} onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
        </ul>
      </>
    </nav>
  );
};

export default NavBar1;
