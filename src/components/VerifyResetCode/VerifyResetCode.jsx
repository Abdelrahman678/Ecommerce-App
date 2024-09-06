import React, { useState, useEffect, useContext } from "react";
import Styles from "./VerifyResetCode.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../context/UserTokenContext";

export default function VerifyResetCode() {
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

  // VerfiyResetCode
  async function handleVerifyResetCode(initialValues) {
    // console.log(initialValues);
    setApiError(null);
    setIsLoading(true);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        // Convert to string here
        { resetCode: String(initialValues.resetCode) }
      );
      // console.log(data.status);
      setIsLoading(false);
      if (data.status == "Success") {
        // navigate to verfication Code
        navigate("/resetPassword");
      //   // set token in localStorage
      //   localStorage.setItem("userToken", data.token);
      //   // UserTokenContext
      //   setUserToken(data.token)
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
      resetCode: Yup.string()
      .matches(
        /^[0-9]{1,6}$/,
        "Code should be up to 6 numbers sent to your Email "
      )
      .required("Code Required"),
    });
  };

  // Formik
  let verifyResetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleVerifyResetCode,
  });

  return (
    <>
      <h2 className="uppercase text-center font-bold text-2xl text-green-700 mb-5">
        Please Enter Your Verfication Code
      </h2>
      <div className=" py-10 flex w-full justify-center items-center relative custom-height">
        <form
          onSubmit={verifyResetCodeFormik.handleSubmit}
          className="flex max-w-2xl flex-col gap-2 w-full absolute top-0 md:top-8 px-4 md:px-0"
        >
          <div className="mb-1">
            <label
              htmlFor="resetCode"
              className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
            >
              Verfication Code
            </label>
            <input
              type="number"
              id="resetCode"
              name="resetCode"
              onBlur={verifyResetCodeFormik.handleBlur}
              onChange={verifyResetCodeFormik.handleChange}
              value={verifyResetCodeFormik.values.resetCode}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Code"
            />
          </div>
          {verifyResetCodeFormik.touched.resetCode &&
          verifyResetCodeFormik.errors.resetCode ? (
            <div
              className="p-2 mb-1 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                Danger alert! {verifyResetCodeFormik.errors.resetCode}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              <button
                type="submit"
                disabled={
                  verifyResetCodeFormik.isValid == false ||
                  verifyResetCodeFormik.dirty == false ||
                  isLoading
                }
                className="text-white block disabled:bg-gray-400 bg-green-700 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            <div className="w-1/2 text-end ms-4">
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
