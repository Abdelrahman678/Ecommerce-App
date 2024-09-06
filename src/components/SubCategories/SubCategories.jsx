import React, { useState, useEffect } from "react";
import Styles from "./SubCategories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SubCategories() {
  // PageNumber
  const [page, setPage] = useState(1);

  // getSubCategories Function
  const getSubCategories = (page) => {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories?page=${page}`
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery getSubCategories
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["SubCategories", page],
    queryFn: () => getSubCategories(page),
    // cached for 10 minutes
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  // console.log("data ==>", data?.data.data);
  // console.log("isLoading ==>", isLoading);
  // console.log(data?.data.metadata.nextPage);

  // change Page function
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if there is an error
  if (isError) {
    return (
      <div>
        <h2>Error fetching brands {isError.message}</h2>
        <p>
          Sorry, there was an error fetching the brands. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SubCategories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex flex-wrap p-4">
        {data ? (
          data.data.data.map((subCategory) => (
            <div
              key={subCategory._id}
              className="w-2/4 md:w-1/3 lg:w-1/4 p-3 md:mt-16 xl:mt-0"
            >
              <div className="product overflow-hidden hover:border-2 hover:rounded-md rounded-md hover:border-green-300 hover:shadow-2xl h-full">
                <Link to={`/subCategories/${subCategory._id}`}>
                  <div className="brands-details bg-gray-200 p-4 h-full">
                    <h2 className="font-bold mb-2 uppercase text-center text-gray-700">
                      {subCategory.name}
                    </h2>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
        {isLoading ? null : (
          <div className="flex justify-center items-center w-full mt-8">
            {Array.from(
              { length: data.data.metadata.numberOfPages },
              (_, i) => (
                <Link
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className="bg-gray-700 hover:bg-gray-400 hover:text-white px-2 py-1 rounded-md text-white me-2"
                >
                  {i + 1}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
