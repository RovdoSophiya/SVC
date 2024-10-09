import React from "react";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import FindDish from "../Components/FindDish/FindDish";
import MenuTable from "../Components/menuTable";
export default function menu() {
  return (
    <div>
      <Header />
      <FindDish />
      <MenuTable />
      <Footer />
    </div>
  );
}
