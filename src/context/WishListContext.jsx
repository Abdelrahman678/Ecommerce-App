import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  // headers
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  // addProductToWishList
  const addProductToWishList = (productId) => {
    // console.log("addProductToCart Headers ==> ", headers);
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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

  //   getWishListProducts
  const getWishListProducts = () => {
    // console.log("getCartProducts Headers ==> ", headers);
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((result) => result)
      .catch((error) => error);
  };

  // removeProductFromWishList
  const removeProductFromWishList = (productId) => {
    // console.log("removeProduct Headers ==> ", headers);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((result) => result)
      .catch((error) => error);
  };

  return (
    <WishListContext.Provider
      value={{
        addProductToWishList,
        getWishListProducts,
        removeProductFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
