import React from "react";
import DishList from "./components/DishList";
import AddDishForm from "./components/AddDishForm";
import DishFilter from "./components/DishFilter";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "./i18n";

const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("menuTitle")}</h1>
      <LanguageSwitcher />
      <DishFilter />
      <AddDishForm />
      <DishList />
    </div>
  );
};

export default App;
