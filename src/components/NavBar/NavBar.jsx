import React, { useState, useEffect, useContext } from "react";
import Styles from "./NavBar.module.css";
import { Navbar } from "flowbite-react";
import FreshCartLogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../context/UserTokenContext";
import { CartContext } from "../../context/CartContext";

export default function NavBar() {
  // UserTokenContext
  const { userToken, setUserToken } = useContext(UserTokenContext);
  // navigate
  const navigate = useNavigate();
  // useContext
  const { cartItemsNumber } = useContext(CartContext);
  // useEffect
  useEffect(() => {}, []);

  // logout Function
  function handleLogout() {
    setUserToken(null);
    localStorage.removeItem("userToken");
    navigate("/");
  }
  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-200 p-2 fixed top-0 left-0 right-0 z-50 border-b-2 shadow-md border-gray-300"
    >
      {/* <Navbar.Brand className="md:my-2 lg:my-0 md:text-center"> */}
      <Link to={"/"} className="md:my-2 lg:my-0 md:text-center">
        <img src={FreshCartLogo} className="mr-3 h-9 " alt="Website Logo" />
      </Link>
      {/* </Navbar.Brand> */}
      <Navbar.Toggle />
      <Navbar.Collapse className="me-5 md:my-2 lg:my-0">
        {userToken ? (
          <>
            <div className="flex flex-col md:flex-row md:flex-wrap">
              <NavLink
                to={"home"}
                className=" py-1 px-3 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                Home
              </NavLink>
              <NavLink
                to={"products"}
                className=" py-1 px-3 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                Products
              </NavLink>
              <NavLink
                to={"categories"}
                className=" py-1 px-3 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                Categories
              </NavLink>
              <NavLink
                to={"brands"}
                className=" py-1 px-3 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                Brands
              </NavLink>
              <NavLink
                to={"subCategories"}
                className=" py-1 px-3 border-b border-gray-100  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                SubCategories
              </NavLink>
              <NavLink
                to={"wishlist"}
                className=" py-1 px-3 border-b border-gray-100  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                Wish List <i className="fa-solid fa-heart"></i>
              </NavLink>
              <NavLink
                to={"cart"}
                className=" py-1 px-3 border-b border-gray-100  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="ms-1"> {cartItemsNumber}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="font-bold py-1 px-2 me-auto border-b border-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:dark:hover:bg-transparent md:dark:hover:text-white text-lg text-black hover:text-green-400"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}
