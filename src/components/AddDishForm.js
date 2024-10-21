import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDish } from "../features/dishesSlice";
import { useTranslation } from "react-i18next";
import "../i18n";
const AddDishForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [type, setType] = useState("Закуска");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = parseInt(price);

    if (parsedPrice <= 0) {
      setError(t("error"));
      return;
    }

    dispatch(addDish({ id: Date.now(), name, type, price: parsedPrice }));
    setName("");
    setPrice("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t("dishes.addDish")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Закуска">{t("dishes.appetizer")}</option>
        <option value="Основное блюдо">{t("dishes.main")}</option>
        <option value="Десерт">{t("dishes.dessert")}</option>
      </select>
      <input
        type="number"
        placeholder={t("dishes.price")}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{t("dishes.error")}</p>}
      <button type="submit">{t("dishes.addDish")}</button>
    </form>
  );
};

export default AddDishForm;
