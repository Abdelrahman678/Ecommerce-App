import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";
// import slick-slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./context/CartContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <CartContextProvider>
    <App />
  </CartContextProvider>
  // </StrictMode>
);
