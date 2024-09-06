import React, { useState, useEffect } from "react";
import Styles from "./BrandDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function BrandDetails() {
  // useParams
  const { brandId } = useParams();
  // useEffect
  useEffect(() => {}, []);

  //  getBrandDetails Function
  const getBrandDetails = () => {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for getBrandDetails
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["CategoryDetails", brandId],
    queryFn: () => getBrandDetails(),
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
            {/* For Name Helmet Start */}
            <Helmet>
              <meta charSet="utf-8" />
              <title>{data.data.data.name} brand</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {/* For Name Helmet End */}
            <div className="w-2/5 mx-auto flex flex-col justify-center items-center ">
              <img
                src={data.data.data.image}
                className="w-2/3 mx-auto py-4 h-[200px] md:h-[300px]  lg:h-[400px]"
                alt=""
              />
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
