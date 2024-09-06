import React, { useState, useEffect } from "react";
import Styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";

export default function ProductItem({
  id,
  imageCover,
  category,
  title,
  price,
  ratingsAverage,
  addToCart,
  loading,
  currentId,
  addToWishList,
}) {
  useEffect(() => {}, []);

  return (
    <>
      <div key={id} className="w-2/4 md:w-1/3 lg:w-1/4 p-3 md:mt-16 xl:mt-0">
        <div className="product overflow-hidden hover:border-2 hover:rounded-md hover:border-green-300 hover:shadow-2xl">
          <Link to={`/products/${id}/${category._id}`}>
            <img src={imageCover} className="w-full rounded-t-md" alt="" />
            <div className="product-details bg-gray-200 rounded-b-md p-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-700">{category?.name}</span>
              </div>
              <h2 className="font-bold mb-2">
                {title
                  .split(" ")
                  .splice(0, 2)
                  .join(" ")
                  .split("-")
                  .splice(0, 2)
                  .join("-")}
              </h2>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{price} EGP</span>
                <span>
                  {ratingsAverage}{" "}
                  <i className="fa fa-star text-yellow-400"></i>
                </span>
              </div>
            </div>
          </Link>
          <div className="m-2 text-end">
            <i
              onClick={() => {
                addToWishList(id);
              }}
              className="fa-solid fa-heart ms-5 text-2xl xl:text-3xl xl:ms-0 hover:text-red-600 hover:cursor-pointer"
            ></i>
          </div>
          <div className="m-2">
            <button
              disabled={loading && id == currentId}
              onClick={() => {
                addToCart(id);
              }}
              className="btn disabled:bg-gray-400 text-white p-2 w-full rounded-md bg-green-400"
            >
              {loading && id == currentId ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
