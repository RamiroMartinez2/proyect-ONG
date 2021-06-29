import React from "react";
import HeaderPublic from "./HeaderPublic";
import Footer from "./Footer";
import { HeaderMain } from "../header/HeaderMain";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderMain />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
