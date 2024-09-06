import React, { useState, useEffect, useContext } from "react";
import Styles from "./ResetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../context/UserTokenContext";

export default function ResetPassword() {
  // isLoading
  const [isLoading, setIsLoading] = useState(false);
  // apiError
  const [apiError, setApiError] = useState(null);
  // navigate
  const navigate = useNavigate();
  // userToken
  const { userToken, setUserToken } = useContext(UserTokenContext);

  // useEffect
  useEffect(() => {}, []);

  // ResetPassword
  async function handleResetPassword(initialValues) {
    // console.log(initialValues);
    setApiError(null);
    setIsLoading(true);

    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        initialValues,
      );
      // console.log(data);
      setIsLoading(false);
      if (data.token) {
        // navigate to verfication Code
        navigate("/home");
        // set token in localStorage
        localStorage.setItem("userToken", data.token);
        // UserTokenContext
        setUserToken(data.token)
      }

    } catch (error) {
      // console.log(error.response.data.message);
      setApiError(error.response.data.message);
      setIsLoading(false);
    }
  }

  // YUP Validation
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .email("Invalid Email ex:XXX@YYY.com")
        .required("Email Required"),
        newPassword: Yup.string()
        .matches(
          /^[A-Za-z0-9]{6,10}$/,
          "Password should be '6 to 10' characters"
        )
        .required("Password Required"),
    });
  };

  // Formik
  let resetPasswordFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });


  return (
    <>
      <div className=" py-10 flex w-full justify-center items-center relative custom-height">
        <form
          onSubmit={resetPasswordFormik.handleSubmit}
          className="flex max-w-2xl flex-col gap-2 w-full absolute top-0 md:top-8 px-4 md:px-0"
        >
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onBlur={resetPasswordFormik.handleBlur}
              onChange={resetPasswordFormik.handleChange}
              value={resetPasswordFormik.values.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="xxx@yyy.com"
            />
          </div>
          {resetPasswordFormik.touched.email && resetPasswordFormik.errors.email ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {resetPasswordFormik.errors.email}
              </span>
            </div>
          ) : null}

          <div className="mb-1">
            <label
              htmlFor="newPassword"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onBlur={resetPasswordFormik.handleBlur}
              onChange={resetPasswordFormik.handleChange}
              value={resetPasswordFormik.values.newPassword}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="password"
            />
          </div>
          {resetPasswordFormik.touched.newPassword && resetPasswordFormik.errors.newPassword ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {resetPasswordFormik.errors.newPassword}
              </span>
            </div>
          ) : null}

          <div className="flex justify-between items-center mb-4">
            <div className="w-1/2">
              <button
                type="submit"
                disabled={
                  resetPasswordFormik.isValid == false ||
                  resetPasswordFormik.dirty == false ||
                  isLoading
                }
                className="text-white block disabled:bg-gray-400 bg-green-700 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Signin"
                )}
              </button>
            </div>
            <div className="w-1/2 text-start md:text-center ms-4">
              <span>
                Return to
                <Link
                  to="/login"
                  className="font-bold text-green-400 hover:text-green-700 ms-1"
                >
                  Login
                </Link>
              </span>
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
