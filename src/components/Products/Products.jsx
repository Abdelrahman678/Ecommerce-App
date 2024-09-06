import React, { useState, useEffect, useContext } from "react";
import Styles from "./Products.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../context/WishListContext";

export default function Products() {
  // useCartContext
  const { addProductToCart, getCartProducts, setCartItemsNumber } =
    useContext(CartContext);
  // useWishListContext
  const {
    addProductToWishList,
    getWishListProducts,
    removeProductFromWishList,
  } = useContext(WishListContext);
  // PageNumber
  const [page, setPage] = useState(1);
  // loading state
  const [loading, setLoading] = useState(false);
  // currentId
  const [currentId, setCurrentId] = useState(null);

  // useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  //  getProducts Function
  const getProducts = (page) => {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      );
    } catch (error) {
      // console.error(error);
      return null;
    }
  };

  // useQuery getProducts
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["Products", page],
    queryFn: () => getProducts(page),
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

  // addToCart function
  const addToCart = async (productId) => {
    setLoading(true);
    setCurrentId(productId);
    // addProductToCart(productId);
    const data = await addProductToCart(productId);
    // console.log("Products", data);
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
    <div className="flex flex-wrap p-4">
      {/* For Name Helmet Start */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* For Name Helmet End */}
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
      {isLoading ? null : (
        <div className="flex justify-center items-center w-full mt-8">
          {Array.from({ length: data.data.metadata.numberOfPages }, (_, i) => (
            <Link
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className="bg-gray-700 hover:bg-gray-400 hover:text-white px-2 py-1 rounded-md text-white me-2"
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
