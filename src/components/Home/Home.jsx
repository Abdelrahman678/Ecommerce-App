import React, { useState, useEffect } from "react";
import Styles from "./Home.module.css";
import { Navbar } from "flowbite-react";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
      {/* For Name Helmet Start */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* For Name Helmet End */}
      <MainSlider />
      <hr className="my-4 border-gray-300 w-full" />
      <div className="lg:w-2/3 lg:mx-auto mb-10 md:mt-16 xl:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 title-font text-center my-2">
          Most Popular Categories
        </h2>
        <Categories isHome={true} />
      </div>
      <hr className="my-4 border-gray-300 w-full" />
      <RecentProducts />
    </>
  );
}
