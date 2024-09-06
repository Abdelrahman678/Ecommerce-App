import React, { useState, useEffect } from "react";
import Styles from "./LayOut.module.css";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function LayOut() {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10">
        <Outlet></Outlet>
      </div>
    </>
  );
}
