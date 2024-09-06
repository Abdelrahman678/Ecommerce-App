import React, { useState, useEffect, useContext } from "react";
import Styles from "./Order.module.css";
import { CartContext } from "../../context/CartContext";
import { UserTokenContext } from "../../context/UserTokenContext";
import { Accordion } from "flowbite-react";

export default function Order() {
  const { getUserOrders } = useContext(CartContext);
  const { userId } = useContext(UserTokenContext);
  const [orders, setOrders] = useState([]);
  // For Upgrading Cart Count
  const { setCartItemsNumber } =
    useContext(CartContext);
  useEffect(() => {
    if (userId) {
      userOrders();
    }
  }, [userId]);

  const userOrders = async () => {
    const { data } = await getUserOrders(userId);
    // console.log("userOrders ==>", data);
    setOrders(data);
    setCartItemsNumber(0)
  };

  return (
    <Accordion className="w-4/5 mx-auto md:mt-10 xl:mt-0">
      {orders
        .slice()
        .reverse()
        .map((order) => (
          <Accordion.Panel key={order.id}>
            <Accordion.Title
              className={
                order.isPaid
                  ? `bg-green-400 mb-2 text-white hover:text-black hover:bg-green-200`
                  : `bg-red-400 mb-2 text-white hover:text-black hover:bg-red-200`
              }
            >
              <p className="font-bold">
                Payment Method:{" "}
                <span className="font-medium">{order.paymentMethodType}</span>
              </p>
              <p className="font-bold">
                Delevired:{" "}
                <span className="font-medium">
                  {order.isDelivered == false
                    ? "Not Delevired"
                    : "Delevired Successfully"}
                </span>
              </p>
              <p className="font-bold">
                Total Price:{" "}
                <span className="font-medium">{order.totalOrderPrice} EGP</span>
              </p>
              <p className="font-bold">
                Order Date:{" "}
                <span className="font-medium">{order.createdAt}</span>
              </p>
            </Accordion.Title>
            <Accordion.Content>
              {order?.cartItems?.map((product) => (
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
                        <span className="font-bold">
                          Quantity: {product.count}
                        </span>
                      </div>
                    </div>

                    <p className="mb-4 font-semibold text-gray-700">
                      {product.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Panel>
        ))}
    </Accordion>
  );
}
