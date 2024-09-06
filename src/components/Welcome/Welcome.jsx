import React, { useState, useEffect } from "react";
import Styles from "./Welcome.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Welcome() {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
      {/* For Name Helmet Start */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* For Name Helmet End */}
      <div className="main-bg-img custom-height flex justify-center items-center flex-col ">
        <h1 className="text-5xl font-extrabold text-green-700 mb-2">
          Welcome To FreshCart
        </h1>
        <h3 className="text-xl font-extrabold text-green-700 mb-4">
          The best Shopping Website
        </h3>

        <div className="flex justify-between items-center">
          <Link
            to={"register"}
            className="bg-green-700 py-2 px-3 rounded-lg text-white hover:text-white hover:bg-green-400 me-2"
          >
            Register Now
          </Link>
          <Link
            to={"login"}
            className="bg-green-700 py-2 px-3 rounded-lg text-white hover:text-white hover:bg-green-400 ms-2"
          >
            Signin
          </Link>
        </div>
      </div>
    </>
  );
}
