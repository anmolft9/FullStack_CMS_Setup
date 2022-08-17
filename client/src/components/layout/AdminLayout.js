import React, { children } from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Sidemenu } from "../side-menu/SideMenu";

export const AdminLayout = () => {
  return (
    <div>
      {/* header */}
      <Header />
      {/* sidebar */}
      <Sidemenu />
      {/* mainBody */}
      <main style={{ minHeight: "71.7vh" }}>{children}</main>
      <Footer />
    </div>
  );
};
