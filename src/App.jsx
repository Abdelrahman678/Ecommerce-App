import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import { CartContext } from "./context/CartContext";
// import CartContextProvider from "./context/CartContext";
import UserTokenContextProvider from "./context/UserTokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedWelcomeLoginRegister from "./components/ProtectedWelcomeLoginRegister/ProtectedWelcomeLoginRegister";
import WishListContextProvider from "./context/WishListContext";

/** All Components Imports **/
// import Brands from "./components/Brands/Brands";
// import Cart from "./components/Cart/Cart";
// import Categories from "./components/Categories/Categories";
// import Home from "./components/Home/Home";
// import LayOut from "./components/LayOut/LayOut";
// import Login from "./components/Login/Login";
// import NotFound from "./components/NotFound/NotFound";
// import Products from "./components/Products/Products";
// import Register from "./components/Register/Register";
// import Welcome from "./components/Welcome/Welcome";
// import ProductDetails from "./components/ProductDetails/ProductDetails";
// import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
// import BrandDetails from "./components/BrandDetails/BrandDetails";
// import SubCategories from "./components/SubCategories/SubCategories";
// import SubCategoryDetails from "./components/SubCategoryDetails/SubCategoryDetails";
// import CategoryDetailsSubCategory from "./components/CategoryDetailsSubCategory/CategoryDetailsSubCategory";
// import ForgottenPassword from "./components/ForgottenPassword/ForgottenPassword";
// import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
// import ResetPassword from "./components/ResetPassword/ResetPassword";
// import CheckOut from "./components/CheckOut/CheckOut";
// import Order from "./components/Order/Order";
// import WishList from "./components/WishList/WishList";

// Lazy Loading
const Home = lazy(() => import("./components/Home/Home"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const LayOut = lazy(() => import("./components/LayOut/LayOut"));
const Login = lazy(() => import("./components/Login/Login"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Products = lazy(() => import("./components/Products/Products"));
const Register = lazy(() => import("./components/Register/Register"));
const Welcome = lazy(() => import("./components/Welcome/Welcome"));
const ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const CategoryDetails = lazy(() =>
  import("./components/CategoryDetails/CategoryDetails")
);
const BrandDetails = lazy(() =>
  import("./components/BrandDetails/BrandDetails")
);
const SubCategories = lazy(() =>
  import("./components/SubCategories/SubCategories")
);
const SubCategoryDetails = lazy(() =>
  import("./components/SubCategoryDetails/SubCategoryDetails")
);
const CategoryDetailsSubCategory = lazy(() =>
  import("./components/CategoryDetailsSubCategory/CategoryDetailsSubCategory")
);
const ForgottenPassword = lazy(() =>
  import("./components/ForgottenPassword/ForgottenPassword")
);
const VerifyResetCode = lazy(() =>
  import("./components/VerifyResetCode/VerifyResetCode")
);
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);
const CheckOut = lazy(() => import("./components/CheckOut/CheckOut"));
const Order = lazy(() => import("./components/Order/Order"));
const WishList = lazy(() => import("./components/WishList/WishList"));

// Lazy Loading End
function App() {
  // Query Client tanstack
  const query = new QueryClient();
  // -----------------------------
  // For Upgrading Cart Count
  const { getCartProducts, cartItemsNumber, setCartItemsNumber } =
    useContext(CartContext);

  // useEffect
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getCartInfo();
    }
  }, []);

  // getCartInfo function
  const getCartInfo = async () => {
    const { data } = await getCartProducts();
    // console.log(data);
    if (data) {
      // setCartItemNumber
      setCartItemsNumber(data.numOfCartItems);
    }
  };
  // -----------------------------
  // CreateBrowserRouter
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense fallback={null}>
          <LayOut />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedWelcomeLoginRegister>
              <Suspense fallback={null}>
                <Welcome />
              </Suspense>
            </ProtectedWelcomeLoginRegister>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <Products />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <Categories />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <Brands />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "subCategories",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <SubCategories />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <WishList />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <Cart />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout/:cartId",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <CheckOut />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <Order />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "products/:id/:categoryId",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <ProductDetails />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/:categoryId",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <CategoryDetails />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/:categoryId/subcategories",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <CategoryDetailsSubCategory />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands/:brandId",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <BrandDetails />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "subCategories/:subCategoryId",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={null}>
                <SubCategoryDetails />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedWelcomeLoginRegister>
              <Suspense fallback={null}>
                <Register />
              </Suspense>
            </ProtectedWelcomeLoginRegister>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedWelcomeLoginRegister>
              <Suspense fallback={null}>
                <Login />
              </Suspense>
            </ProtectedWelcomeLoginRegister>
          ),
        },
        {
          path: "forgottenPassword",
          element: (
            <ProtectedWelcomeLoginRegister>
              <Suspense fallback={null}>
                <ForgottenPassword />
              </Suspense>
            </ProtectedWelcomeLoginRegister>
          ),
        },
        {
          path: "verifyResetCode",
          element: (
            <ProtectedWelcomeLoginRegister>
              <Suspense fallback={null}>
                <VerifyResetCode />
              </Suspense>
            </ProtectedWelcomeLoginRegister>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <ProtectedWelcomeLoginRegister>
              <Suspense fallback={null}>
                <ResetPassword />
              </Suspense>
            </ProtectedWelcomeLoginRegister>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={query}>
        <UserTokenContextProvider>
          <WishListContextProvider>
            {/* <CartContextProvider> */}
            <RouterProvider router={router}></RouterProvider>
            {/* </CartContextProvider> */}
          </WishListContextProvider>

          {/* <Offline>
            <div className="bg-red-600 text-white fixed bottom-0 left-2/4 -translate-x-1/2 p-4">
              Your are not connected to the internet "Please Check Internet
              Connection"
            </div>
          </Offline> */}

          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "#10b274",
                  border: "2px solid #31C48D",
                },
              },
              error: {
                style: {
                  background: "#c11111",
                  border: "2px solid #f44b4b",
                },
              },
              style: {
                padding: "16px",
                color: "#fff",
              },
            }}
          />
          <ReactQueryDevtools></ReactQueryDevtools>
        </UserTokenContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
