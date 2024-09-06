import React, { useState, useEffect } from "react";
import Styles from "./CategoryDetails.module.css";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function CategoryDetails({ isCatDetSubCat = false }) {
  // useParams
  const { categoryId } = useParams();
  // useEffect
  useEffect(() => {}, []);

  //  getCategoryDetails Function
  const getCategoryDetails = () => {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for CategoryDetails
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["CategoryDetails", categoryId],
    queryFn: () => getCategoryDetails(),
    // cached for 10 minutes
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  // console.log("data==>", data?.data.data);
  // console.log("isLoading ==>", isLoading);

  // Check if there is an error
  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${data?.data?.data.image})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`flex flex-wrap justify-center items-center border ${
          !isCatDetSubCat ? "custom-height" : "h-[calc(100vh-52px-13rem)]"
        } shadow-lg md:mt-10 xl:mt-0`}
      >
        {data ? (
          <>
            {/* For Name Helmet Start */}
            <Helmet>
              <meta charSet="utf-8" />
              <title>{data.data.data.name}</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {/* For Name Helmet End */}
            <div className="w-3/5 bg-gray-100 text-center mx-auto shadow-lg rounded-md py-5">
              <h2
                className={`text-gray-900 font-serif font-bold mb-2 ${
                  !isCatDetSubCat
                    ? "text-3xl md:text-5xl xl:text-8xl"
                    : "text-xl md:text-3xl xl:text-6xl"
                }`}
              >
                {data.data.data.name}
              </h2>
              {!isCatDetSubCat ? (
                <Link to={`/categories/${categoryId}/subcategories`}>
                  <button className="text-gray-600 bg-gray-200 mt-2 p-2 rounded-md">
                    Check it's SubCategories{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </Link>
              ) : null}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
