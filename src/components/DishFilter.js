//фильтрация блюд
import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/dishesSlice";

const DishFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>Фильтр по типу блюда: </label>
      <select onChange={handleFilterChange}>
        <option value="Все">Все</option>
        <option value="Закуска">Закуска</option>
        <option value="Основное блюдо">Основное блюдо</option>
        <option value="Десерт">Десерт</option>
      </select>
    </div>
  );
};

export default DishFilter;
