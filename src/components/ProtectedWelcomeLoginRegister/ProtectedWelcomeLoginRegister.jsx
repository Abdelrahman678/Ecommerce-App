import React, { useState, useEffect } from "react";
import Styles from "./ProtectedWelcomeLoginRegister.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectedWelcomeLoginRegister({ children }) {
  if (!localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/home"} />;
  }
}
