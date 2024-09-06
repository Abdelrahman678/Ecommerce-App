import React, { useState, useEffect } from "react";
import Styles from "./Categories.module.css";
import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function Categories({ isHome = false }) {
  // slick carousal
  var settings = {
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
    arrows: false,
  };

  // useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //  getCategories Function
  const getCategories = () => {
    try {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for Categories
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => getCategories(),
    // cached for 10 minutes
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  // console.log("data ==>", data?.data.data);
  // console.log("isLoading ==>", isLoading);

  if (isHome) {
    return (
      <>
        {data ? (
          <>
            <div className={`px-4 flex justify-center items-center`}>
              <Slider {...settings} className="w-full">
                {data.data.data.map((category) => (
                  <Link to={`/categories/${category._id}`} key={category._id}>
                    <div className="p-4">
                      <img
                        src={category.image}
                        alt=""
                        className="w-full h-[200px]  md:h-[300px] mb-4"
                      />
                      <h2 className="lg:w-full text-center">{category.name}</h2>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }

  return (
    <div className="flex flex-wrap p-4">
      {/* For Name Helmet Start */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* For Name Helmet End */}
      {data ? (
        data.data.data.map((category) => (
          <div
            key={category._id}
            className="w-2/4 md:w-1/3 lg:w-1/4 p-3 md:mt-16 xl:mt-0"
          >
            <div className="category overflow-hidden hover:border-2 hover:rounded-md h-full hover:border-green-300 hover:shadow-2xl">
              <Link to={`/categories/${category._id}`} key={category._id}>
                <img
                  src={category.image}
                  className="w-full h-[200px]  md:h-[300px]"
                  alt=""
                />
                <div className="category-details h-full bg-gray-200 p-4">
                  <h2 className="font-bold h-full uppercase mb-2 text-center text-gray-700">
                    {category.name}
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
