import React, { useState, useEffect, useContext } from "react";
import Styles from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  // useCartContext
  const {
    getCartProducts,
    removeProduct,
    updateProduct,
    clearCart,
    cartId,
    setCartId,
    cartItemsNumber,
    setCartItemsNumber,
  } = useContext(CartContext);
  // CartInfo
  const [cartInfo, setCartInfo] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);
  // countSpinner
  const [countSpinner, setCountSpinner] = useState(false);
  // currentId
  const [currentId, setCurrentId] = useState(null);
  // noCartInfo
  const [noCartInfo, setNoCartInfo] = useState("");
  // navigate
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    getCartInfo();
  }, []);

  // getCartInfo function
  const getCartInfo = async () => {
    const { data } = await getCartProducts();
    // console.log(data);
    setCartId(data.cartId);
    if (data) {
      setCartInfo(data);
      // setCartItemNumber
      setCartItemsNumber(data.numOfCartItems);
    } else {
      setNoCartInfo("Your Cart Is Empty");
    }
    // setCartInfo(data);
    setLoading(false);
  };

  // removeItemFromCart
  const removeItemFromCart = async (id) => {
    setLoading(true);
    const data = await removeProduct(id);
    // console.log("afterDataRemoved", data);
    // getCartInfo();
    setCartInfo(data.data);
    // setCartItemNumber
    setCartItemsNumber(data.data.numOfCartItems);
    setLoading(false);
  };

  // updateProductCount
  const updateProductCount = async (id, count) => {
    setCurrentId(id);
    setCountSpinner(true);
    const data = await updateProduct(id, count);
    // console.log("afterDataUpdated", data);
    setCartInfo(data.data);
    setCountSpinner(false);
  };

  // clearAllCart
  const clearAllCart = async () => {
    setLoading(true);
    const data = await clearCart();
    // console.log("afterDataCleared", data);
    if (data.data.message == "success") {
      setNoCartInfo("Your Cart Is Empty");
      setCartInfo([]);
      setCartItemsNumber(0);
      setLoading(false);
    }
  };

  // goToCheckOut function
  const goToCheckOut = () => {
    // redirect to checkout page
    navigate(`/checkout/${cartId}`);
  };

  return (
    <>
      {/* For Name Helmet Start */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* For Name Helmet End */}
      <div className="w-full lg:w-2/3 mx-auto p-4 md:mt-10 xl:mt-0">
        <h2 className="text-center text-3xl font-bold mb-4 text-green-900">
          My Cart
        </h2>
        {cartInfo?.numOfCartItems == 0 ? (
          <h3 className="text-center text-2xl font-semibold mb-4 text-green-900">
            No products in your cart
            <i className="fa-solid fa-heart-crack text-red-600 ms-2"></i>
          </h3>
        ) : null}

        <div className="w-full mb-5 bg-gray-50 p-4 border-2">
          {/* Cart Products Here */}
          {loading ? (
            <Loader />
          ) : (
            <>
              {noCartInfo ? (
                <p className="text-center py-4">
                  {noCartInfo}{" "}
                  <i className="fa-solid fa-heart-crack ms-2 text-red-600"></i>
                </p>
              ) : (
                cartInfo?.data.products?.map((product) => (
                  <div
                    key={product._id}
                    className="CartProduct flex justify-center items-center border-b-2 mb-4 overflow-hidden hover:bg-gray-200"
                  >
                    <div className="ProductImg w-1/3 lg:w-1/5 p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-full lg:w-4/5 lg:mx-auto"
                        alt=""
                      />
                    </div>
                    <div className="ProductDetails w-2/3 lg:w-4/5 p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-extrabold text-lg lg:text-xl text-green-900">
                          {product.product.title
                            .split(" ")
                            .splice(0, 2)
                            .join(" ")}
                        </h2>
                        <div className="flex items-center text-lg lg:text-xl">
                          <i
                            onClick={() =>
                              updateProductCount(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="fa-solid fa-square-plus cursor-pointer me-2 text-green-500"
                          ></i>
                          <span className="font-bold">
                            {countSpinner && product.product.id == currentId ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              product.count
                            )}
                          </span>
                          <i
                            onClick={() =>
                              updateProductCount(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className={`fa-solid fa-square-minus cursor-pointer ms-2 text-green-500 ${
                              product.count == 1 ? "hidden" : ""
                            }`}
                          ></i>
                        </div>
                      </div>

                      <p className="mb-4 font-semibold text-gray-700">
                        {product.price} EGP
                      </p>
                      <div className="removeBtn">
                        <span
                          onClick={() => {
                            removeItemFromCart(product.product.id);
                          }}
                          className="text-white text-sm py-1 px-2 cursor-pointer bg-red-600 rounded-md hover:bg-red-400"
                        >
                          <i className="fa-solid fa-trash me-2"></i>
                          <span>Remove</span>
                        </span>
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
            <span className="font-bold">Total Amount: </span>
            <span>{cartInfo?.data?.totalCartPrice} EGP</span>
          </h3>
          <h3 className="mb-4 text-lg text-green-900">
            <span className="font-bold">Number Of Items: </span>
            <span>{cartInfo?.numOfCartItems}</span>
          </h3>

          <div className="flex flex-wrap justify-between items-center">
            <div className="w-3/5">
              <button
                onClick={goToCheckOut}
                disabled={
                  noCartInfo || cartInfo?.numOfCartItems == 0 || loading
                }
                className="w-full disabled:bg-green-300 bg-green-900 px-4 py-2 me-2 hover:bg-green-700 text-white"
              >
                Check Out
              </button>
            </div>
            <div className="w-2/5">
              <button
                onClick={clearAllCart}
                disabled={
                  noCartInfo || cartInfo?.numOfCartItems == 0 || loading
                }
                className="w-full disabled:bg-red-300 bg-red-600 px-4 py-2 ms-2 hover:bg-red-400 text-white"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
