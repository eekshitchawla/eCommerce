import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./screens/Navbar/Navbar.js";
import BodyMain from "./screens/BodyMain/BodyMain.js";
import Footer from "./screens/Footer/Footer.js";
import Login from "./screens/Login/Login.js";
import Signup from "./screens/Signup/Signup.js";
import MyCart from "./screens/MyCart/MyCart.js";
import WishList from "./screens/WishList/WishList.js";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BodyMain />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/mycart",
      element: <MyCart />,
    },
    {
      path: "/myList",
      element: <WishList />,
    },
  ]);
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
