import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/dishesSlice";
import { useTranslation } from "react-i18next";

const DishFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>{t("dishes.filterByType")}:</label>
      <select onChange={handleFilterChange}>
        <option value="Все">{t("dishes.all")}</option>
        <option value="Закуска">{t("dishes.appetizer")}</option>
        <option value="Основное блюдо">{t("dishes.main")}</option>
        <option value="Десерт">{t("dishes.dessert")}</option>
      </select>
    </div>
  );
};

export default DishFilter;
