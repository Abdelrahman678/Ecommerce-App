import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  // headers
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  // State
  const [cartId, setCartId] = useState(null);
  // cartItemsNumber
  const [cartItemsNumber, setCartItemsNumber] = useState(null);

  // addProductToCart
  const addProductToCart = (productId) => {
    // headers is null when i first signin
    // console.log("addProductToCart Headers ==> ", headers);

    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((result) => result)
      .catch((error) => error);
  };

  const getCartProducts = () => {
    // headers is null when i first siggnin
    // console.log("getCartProducts Headers ==> ", headers);
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((result) => result)
      .catch((error) => error);
  };

  // removeProduct
  const removeProduct = (productId) => {
    // console.log("removeProduct Headers ==> ", headers);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((result) => result)
      .catch((error) => error);
  };

  // updateProduct
  const updateProduct = (productId, count) => {
    // console.log("updateProduct Headers ==> ", headers);
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((result) => result)
      .catch((error) => error);
  };

  // clearCart
  const clearCart = () => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((result) => result)
      .catch((error) => error);
  };

  // payment
  const payment = (url, shippingAddress) => {
    // console.log("cartId ==>", cartId,"shippingAddress ==>", shippingAddress);
    return axios
      .post(url, { shippingAddress }, { headers })
      .then((result) => result)
      .catch((error) => error);
  };

  // getUserOrders
  const getUserOrders = async (userId) => {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((result) => result)
      .catch((error) => error);
  };

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        removeProduct,
        updateProduct,
        clearCart,
        payment,
        cartId,
        setCartId,
        getUserOrders,
        cartItemsNumber,
        setCartItemsNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
