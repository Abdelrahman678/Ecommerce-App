import React, { useState, useEffect } from "react";
import Styles from "./ProtectedRoutes.module.css";

import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({children}) {
  
  useEffect(() => {}, []);
  if(localStorage.getItem("userToken")){
    return children;
  }else{
    //  navigate
    return <Navigate to={"/"} />

  }
  
}
