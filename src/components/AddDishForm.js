import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDish } from "../features/dishesSlice";

const AddDishForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Закуска");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = parseInt(price);

    if (parsedPrice <= 0) {
      setError("Цена должна быть положительным числом.");
      return;
    }

    dispatch(addDish({ id: Date.now(), name, type, price: parsedPrice }));
    setName("");
    setPrice("");
    setError(""); // Сбрасываем ошибку после успешного добавления
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название блюда"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Закуска">Закуска</option>
        <option value="Основное блюдо">Основное блюдо</option>
        <option value="Десерт">Десерт</option>
      </select>
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Добавить блюдо</button>
    </form>
  );
};

export default AddDishForm;
