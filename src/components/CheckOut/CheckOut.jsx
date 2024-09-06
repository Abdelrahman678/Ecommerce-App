import React, { useState, useEffect, useContext } from "react";
import Styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function CheckOut() {
  // useContext
  const { payment } = useContext(CartContext);
  // useParams
  const { cartId } = useParams();
  // isLoading
  const [isLoading, setIsLoading] = useState(false);
  // apiError
  const [apiError, setApiError] = useState(null);
  // navigate
  const navigate = useNavigate();
  // isOnlinePayment
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  // useEffect
  useEffect(() => {}, []);

  // handlePayment
  async function handlePayment() {
    setIsLoading(true);
    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    if (isOnlinePayment) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
    }
    // console.log(paymentFormik.values);
    const data = await payment(url, paymentFormik.values);
    if (data?.data?.status == "success") {
      // console.log(data);
      if (isOnlinePayment) {
        window.location.href = data.data.session.url;
      } else {
        navigate("/allorders");
      }
    } else {
      setApiError(data?.response?.data?.statusMsg);
      // console.log(data?.response?.data?.statusMsg);
    }
    setIsLoading(false)
  }

  // YUP Validation
  const validationSchema = () => {
    return Yup.object().shape({
      details: Yup.string()
        .min(3, "Not less than 3 characters")
        .max(15, "Max is 15 characters")
        .required("Details Required"),

      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/)
        .required("Phone Required"),

      city: Yup.string()
        .min(3, "Not less than 3 characters")
        .max(15, "Max is 15 characters")
        .required("City Required"),
    });
  };

  // Formik
  let paymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <>
      <div className=" py-10 flex w-full justify-center items-center relative custom-height">
        <form
          onSubmit={paymentFormik.handleSubmit}
          className="flex max-w-2xl flex-col gap-2 w-full absolute top-0 md:top-8 px-4 md:px-0"
        >
          <div className="mb-1">
            <label
              htmlFor="details"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Details
            </label>
            <input
              type="text"
              id="details"
              name="details"
              onBlur={paymentFormik.handleBlur}
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.details}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="details"
            />
          </div>
          {paymentFormik.touched.details && paymentFormik.errors.details ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {paymentFormik.errors.details}
              </span>
            </div>
          ) : null}

          <div className="mb-1">
            <label
              htmlFor="phone"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onBlur={paymentFormik.handleBlur}
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="phone"
            />
          </div>
          {paymentFormik.touched.phone && paymentFormik.errors.phone ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {paymentFormik.errors.phone}
              </span>
            </div>
          ) : null}

          <div className="mb-1">
            <label
              htmlFor="city"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onBlur={paymentFormik.handleBlur}
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.city}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="City"
            />
          </div>
          {paymentFormik.touched.city && paymentFormik.errors.city ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {paymentFormik.errors.city}
              </span>
            </div>
          ) : null}

          <div className="flex justify-between items-center mb-4">
            <div className="w-full">
              <div className="mb-2">
                <input
                  onChange={() => setIsOnlinePayment(!isOnlinePayment)}
                  type="checkbox"
                  id="forOnline"
                  className="cursor-pointer text-green-500 focus:outline-green-300"
                />
                <label htmlFor="forOnline" className="ms-2">
                  Pay Online
                </label>
              </div>
              <button
                type="submit"
                // disabled={
                //   paymentFormik.isValid == false ||
                //   paymentFormik.dirty == false ||
                //   isLoading
                // }
                className="text-white block disabled:bg-gray-400 bg-green-700 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : isOnlinePayment ? (
                  "Online Payment"
                ) : (
                  "Cash On Delivery"
                )}
              </button>
            </div>
          </div>
          {apiError ? (
            <div
              className="p-2 text-red-50 text-center text-lg rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Failed! {apiError}</span>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}
