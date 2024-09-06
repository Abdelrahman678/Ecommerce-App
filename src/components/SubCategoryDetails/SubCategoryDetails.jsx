import React, { useState, useEffect } from "react";
import Styles from "./SubCategoryDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function SubCategoryDetails() {
  // useParams
  const { subCategoryId } = useParams();

  // useEffect
  useEffect(() => {}, []);

  //  getsubCategoryDetails Function
  const getsubCategoryDetails = () => {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for getsubCategoryDetails
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["SubCategoryDetails", subCategoryId],
    queryFn: () => getsubCategoryDetails(),
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
      <div className="flex flex-wrap justify-center items-center border-2 custom-height shadow-2xl brands-bg-img ">
        {data ? (
          <>
          <Helmet>
              <meta charSet="utf-8" />
              <title>{data.data.data.name}</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="w-2/5 mx-auto flex flex-col justify-center items-center ">
              <h2 className="text-5xl text-center md:text-6xl  text-gray-900 xl:text-7xl font-serif font-bold">
                {data.data.data.name}
              </h2>
            </div>

            {/* <div className="w-3/5 mx-auto ">
              
            </div> */}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
