//список блюд
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDish } from "../features/dishesSlice";

const DishList = () => {
  const dishes = useSelector((state) => {
    if (state.dishes.filter === "Все") {
      return state.dishes.dishes;
    }
    return state.dishes.dishes.filter(
      (dish) => dish.type === state.dishes.filter
    );
  });

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteDish(id));
  };

  return (
    <div>
      <h2>Меню</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.name} — {dish.type} — {dish.price}₽
            <button onClick={() => handleDelete(dish.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;
