import React, { useState, useEffect } from "react";
import Styles from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // isLoading
  const [isLoading, setIsLoading] = useState(false);
  // apiError
  const [apiError, setApiError] = useState(null);
  // navigate
  const navigate = useNavigate();
  // useEffect
  useEffect(() => {}, []);

  // Register
  async function handleRegister(initialValues) {
    // console.log(initialValues);
    setApiError(null);
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        initialValues
      );
      // console.log(data.message);
      setIsLoading(false);
      if (data.message == "success") {
        // navigate to login
        navigate("/login");
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
      name: Yup.string()
        .min(3, "Not less than 3 characters")
        .max(15, "Max is 15 characters")
        .required("Name Required"),
      email: Yup.string()
        .email("Invalid Email ex:XXX@YYY.com")
        .required("Email Required"),
      password: Yup.string()
        .matches(
          /^[A-Za-z0-9]{6,10}$/,
          "Password should be '6 to 10' characters"
        )
        .required("Password Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "rePassword should match Password")
        .required("Repeat Passowrd Required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/)
        .required("Phone Required"),
    });
  };

  // Formik
  let registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className=" py-10 flex w-full justify-center items-center relative custom-height">
        <form
          onSubmit={registerFormik.handleSubmit}
          className="flex max-w-2xl flex-col gap-2 w-full absolute top-0 md:top-8 px-4 md:px-0"
        >
          <div className="mb-1">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="name"
            />
          </div>
          {registerFormik.touched.name && registerFormik.errors.name ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {registerFormik.errors.name}
              </span>
            </div>
          ) : null}

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
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="xxx@yyy.com"
            />
          </div>
          {registerFormik.touched.email && registerFormik.errors.email ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {registerFormik.errors.email}
              </span>
            </div>
          ) : null}

          <div className="mb-1">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="password"
            />
          </div>
          {registerFormik.touched.password && registerFormik.errors.password ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {registerFormik.errors.password}
              </span>
            </div>
          ) : null}

          <div className="mb-1">
            <label
              htmlFor="rePassword"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.rePassword}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="rePassword"
            />
          </div>
          {registerFormik.touched.rePassword &&
          registerFormik.errors.rePassword ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {registerFormik.errors.rePassword}
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
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="phone"
            />
          </div>
          {registerFormik.touched.phone && registerFormik.errors.phone ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {registerFormik.errors.phone}
              </span>
            </div>
          ) : null}

          <div className="flex justify-between items-center mb-4">
            <div className="w-1/2">
              <button
                type="submit"
                disabled={
                  registerFormik.isValid == false ||
                  registerFormik.dirty == false ||
                  isLoading
                }
                className="text-white block disabled:bg-gray-400 bg-green-700 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className="w-1/2 text-start md:text-center ms-4">
              <span>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-green-400 hover:text-green-700"
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
