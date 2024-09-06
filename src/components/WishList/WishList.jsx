import React, { useState, useEffect, useContext } from "react";
import Styles from "./WishList.module.css";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../context/WishListContext";

export default function WishList() {
  // useWishListContext
  const {
    addProductToWishList,
    getWishListProducts,
    removeProductFromWishList,
  } = useContext(WishListContext);
  // navigate
  const navigate = useNavigate();
  // wishListInfo
  const [wishListInfo, setwishListInfo] = useState(null);
  // nowishListInfo
  const [noWishListInfo, setNoWishListInfo] = useState("");
  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishListInfo();
  }, []);

  // getWishListInfo function
  const getWishListInfo = async () => {
    const { data } = await getWishListProducts();
    // console.log("wishList ==> ", data);
    if (data) {
      setwishListInfo(data);
    } else {
      setNoWishListInfo("Your Wish List Is Empty");
    }
    setLoading(false);
  };

  // removeItemFromWishList
  const removeItemFromWishList = async (id) => {
    setLoading(true);
    const data = await removeProductFromWishList(id);
    // console.log("afterWishListRemoved", data.data.status);
    if (data.data.status == "success") {
      getWishListInfo();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* For Name Helmet Start */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* For Name Helmet End */}
      <div className="w-full lg:w-2/3 mx-auto p-4 md:mt-10 xl:mt-0">
        <h2 className="text-center text-3xl font-bold mb-4 text-green-900">
          My Wish List
        </h2>
        {wishListInfo?.count == 0 ? (
          <h3 className="text-center text-2xl font-semibold mb-4 text-green-900">
            No products in your Wish List
            <i className="fa-solid fa-heart-crack text-red-600 ms-2"></i>
          </h3>
        ) : null}

        <div className="w-full mb-5 bg-gray-50 p-4 border-2">
          {/* WishList Products Here */}
          {loading ? (
            <Loader />
          ) : (
            <>
              {noWishListInfo ? (
                <p className="text-center py-4">
                  {noWishListInfo}
                  <i className="fa-solid fa-heart-crack ms-2 text-red-600"></i>
                </p>
              ) : (
                wishListInfo?.data
                  ?.slice()
                  .reverse()
                  .map((product) => (
                    <div
                      key={product._id}
                      className="CartProduct flex justify-center items-center border-b-2 mb-4 overflow-hidden hover:bg-gray-200"
                    >
                      <div className="ProductImg w-1/3 lg:w-1/5 p-4">
                        <img
                          src={product.imageCover}
                          className="w-full lg:w-4/5 lg:mx-auto"
                          alt=""
                        />
                      </div>
                      <div className="ProductDetails w-2/3 lg:w-4/5 p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="font-extrabold text-lg lg:text-xl text-green-900">
                            {product.title.split(" ").splice(0, 2).join(" ")}
                          </h2>
                          <div className="flex flex-col items-start text-lg lg:text-xl">
                            <span className="font-bold">
                              Qty: {product.quantity}
                            </span>
                          </div>
                        </div>

                        <p className="mb-1 font-semibold text-gray-700">
                          {product.price} EGP
                        </p>
                        <p className="mb-1 font-semibold text-gray-700">
                          Sold: {product.sold}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="mb-2 font-semibold text-gray-700">
                            {product.ratingsAverage}
                            <i className="fa-solid fa-star ms-1 text-yellow-400"></i>
                          </p>
                          <div className="removeBtn">
                            <span
                              onClick={() => {
                                removeItemFromWishList(product.id);
                              }}
                              className="text-white text-sm py-1 px-2 cursor-pointer bg-red-600 rounded-md hover:bg-red-400"
                            >
                              <i className="fa-solid fa-trash me-2"></i>
                              <span>Remove</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
        <div className="w-full border-2 p-4">
          <h3 className="mb-4 text-lg text-green-900">
            <span className="font-bold">Number Of Items: </span>
            <span>{wishListInfo?.count}</span>
          </h3>
        </div>
      </div>
    </>
  );
}
