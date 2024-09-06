import React, { useState, useEffect, useContext } from "react";
import Styles from "./RecentProducts.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../context/WishListContext";

export default function RecentProducts() {
  // useCartContext
  const { addProductToCart, getCartProducts, setCartItemsNumber } =
    useContext(CartContext);
  // useWishListContext
  const {
    addProductToWishList,
    getWishListProducts,
    removeProductFromWishList,
  } = useContext(WishListContext);
  // loading state
  const [loading, setLoading] = useState(false);
  // currentId
  const [currentId, setCurrentId] = useState(null);
  // useEffect
  useEffect(() => {}, []);

  // -----------------------------------------
  // For Upgrading Cart Count
  // getCartInfo function
  const getCartInfo = async () => {
    const { data } = await getCartProducts();
    if (data) {
      // setCartItemNumber
      setCartItemsNumber(data.numOfCartItems);
    }
  };
  // -----------------------------------------

  //  getRecentProducts Function
  const getRecentProducts = () => {
    try {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery getRecentProducts
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["RecentProducts"],
    queryFn: () => getRecentProducts(),
    // cached for 10 minutes
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
  });

  // addToCart function
  const addToCart = async (productId) => {
    setLoading(true);
    setCurrentId(productId);
    // addProductToCart(productId);
    const data = await addProductToCart(productId);
    // console.log("Recent Products", data);
    if (data?.data?.status == "success") {
      getCartInfo();
      toast.success(data.data.message, {
        icon: (
          <i className="fa-solid fa-cart-shopping text-gray-700 text-lg me-2"></i>
        ),
      });
    } else {
      toast.error(data.response.data.message);
    }
    setLoading(false);
  };

  // addToWishList function
  const addToWishList = async (productId) => {
    // setCurrentId(productId);
    const data = await addProductToWishList(productId);
    // console.log("WishList", data);
    if (data?.data?.status == "success") {
      toast.success(data.data.message, {
        icon: <i className="fa-solid fa-heart text-gray-700 text-lg me-2"></i>,
      });
    } else {
      toast.error(data.response.data.message);
    }
  };

  // Check if there is an error
  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap p-4">
        {data ? (
          data.data.data.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              imageCover={product.imageCover}
              category={product.category}
              title={product.title}
              price={product.price}
              ratingsAverage={product.ratingsAverage}
              addToCart={addToCart}
              loading={loading}
              currentId={currentId}
              addToWishList={addToWishList}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
