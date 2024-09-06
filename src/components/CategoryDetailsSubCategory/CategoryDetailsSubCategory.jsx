import React, { useState, useEffect } from "react";
import Styles from "./CategoryDetailsSubCategory.module.css";
import CategoryDetails from "../CategoryDetails/CategoryDetails";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function CategoryDetailsSubCategory() {
  // useParams
  const { categoryId } = useParams();
  // useEffect
  useEffect(() => {}, []);

  //  getCategoryDetailsSubCategory Function
  const getCategoryDetailsSubCategory = () => {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for CategoryDetails
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["CategoryDetailsSubCategory", categoryId],
    queryFn: () => getCategoryDetailsSubCategory(),
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
      <div className="w-2/3 mx-auto">
        <CategoryDetails isCatDetSubCat={true} />
      </div>
      <div className="flex flex-wrap p-4">
        {data ? (
          data.data.data.map((subCategory) => (
            <div
              key={subCategory._id}
              className="w-2/4 md:w-1/3 lg:w-1/4 p-3 md:mt-16 xl:mt-0"
            >
              <div className="product overflow-hidden hover:border-2 hover:rounded-md rounded-md hover:border-green-300 hover:shadow-2xl h-full">
                <div className="brands-details bg-gray-200 p-4 h-full">
                  <h2 className="font-bold mb-2 uppercase text-center text-gray-700">
                    {subCategory.name}
                  </h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
