import React, { useState, useEffect, useContext } from "react";
import Styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../context/WishListContext";

export default function ProductDetails() {
  // useCartContext
  const { addProductToCart, getCartProducts, setCartItemsNumber } =
    useContext(CartContext);
  // useWishListContext
  const {
    addProductToWishList,
    getWishListProducts,
    removeProductFromWishList,
  } = useContext(WishListContext);
  // useParams
  const { id, categoryId } = useParams();
  // State to store the selected product's ID
  const [selectedProductId, setSelectedProductId] = useState(null);
  // loading state
  const [loading, setLoading] = useState(false);
  // currentId
  const [currentId, setCurrentId] = useState(null);

  // slick carousal
  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Next Arrow
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }
  // Previous Arrow
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

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

  //  getProductDetails Function
  const getProductDetails = () => {
    try {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for ProductDetails
  const { isLoading, data, isError, isPreviousData } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: () => getProductDetails(),
    // cached for 10 minutes
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
  });

  // getRelatedProducts
  const getRelatedProducts = () => {
    try {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery for Related Products
  const relatedProductsQuery = useQuery({
    queryKey: ["RelatedProducts", categoryId],
    queryFn: () => getRelatedProducts(),
    // cached for 10 minutes
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  // useEffect
  useEffect(() => {
    setSelectedProductId(id);
    // to scroll up when i enter the productDetails or choose another
    window.scrollTo(0, 0);
  }, [id]);

  // log product Details
  // -------------------
  // console.log("data ==>", data?.data.data);
  // console.log("isLoading ==>", isLoading);

  // log Related Products
  // --------------------
  // console.log(
  //   "related Products Query ==>",
  //   relatedProductsQuery.data?.data.data.filter(
  //     (ele) => ele._id !== selectedProductId && ele.category._id == categoryId
  //   )
  // );
  // console.log("related isLoading ==>", relatedProductsQuery.isLoading);

  // addToCart function
  const addToCart = async (productId) => {
    setLoading(true);
    setCurrentId(productId);
    // addProductToCart(productId);
    const data = await addProductToCart(productId);
    // console.log("ProductDetails", data);
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
      <div className="flex flex-wrap justify-center items-center mb-14 border shadow-lg hover:shadow-green-400 md:mt-16 xl:mt-0">
        {data ? (
          <>
            <div className="w-4/5 lg:w-2/5 py-10 md:mt-10 lg:mt-0 p-2">
              <div className="w-3/4 mx-auto">
                <Slider {...settings}>
                  {data.data.data.images.map((src) => (
                    <img
                      className="rounded-md border-2"
                      key={data.data.data.id}
                      src={src}
                    />
                  ))}
                </Slider>
              </div>
            </div>
            {/* For Name Helmet Start */}
            <Helmet>
              <meta charSet="utf-8" />
              <title>{data.data.data.title}</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {/* For Name Helmet End */}
            <div className="w-full lg:w-3/5 p-5">
              <h2 className="text-2xl mb-2 font-bold">
                {data.data.data.title}
              </h2>
              <p className="mb-2 text-gray-500">{data.data.data.description}</p>
              <div className="flex justify-between mb-8">
                <span className="font-bold block text-green-700">
                  {data.data.data.category.name}
                </span>
                <i
                  onClick={() => {
                    addToWishList(id);
                  }}
                  className="fa-solid fa-heart text-2xl md:text-3xl hover:text-red-600 hover:cursor-pointer"
                ></i>
              </div>

              <div className="flex justify-between mb-4">
                <span className="font-semibold">
                  {data.data.data.price} EGP
                </span>
                <span className="font-bold">
                  {data.data.data.ratingsAverage}{" "}
                  <i className="fa fa-star  text-yellow-400"></i>
                </span>
              </div>
              <button
                disabled={loading && id == currentId}
                onClick={() => {
                  addToCart(data.data.data.id);
                }}
                className="hover:bg-green-300 disabled:bg-gray-400 w-full text-white p-2 rounded-md bg-green-400"
              >
                {loading && data.data.data.id == currentId ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>

      {relatedProductsQuery.data ? (
        <>
          <h2 className="text-xl p-5 text-green-700 underline underline-offset-8 lg:text-3xl my-10  font-bold border-t-2 pt-5">
            Related Products
          </h2>

          <div className="flex flex-wrap p-4">
            {relatedProductsQuery.data.data.data
              .filter(
                (ele) =>
                  ele._id !== selectedProductId &&
                  ele.category._id == categoryId
              )
              .map((product) => (
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
              ))}
          </div>
        </>
      ) : null}
    </>
  );
}
