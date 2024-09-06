import React, { useState, useEffect } from "react";
import Styles from "./NotFound.module.css";
import NotFoundLogo from "../../assets/images/error.svg"

export default function NotFound() {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={NotFoundLogo} alt="" />
      </div>
    </>
  );
}
