import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDish } from "../features/dishesSlice";
import { useTranslation } from "react-i18next";

const DishList = () => {
  const { t } = useTranslation();
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
      <h2 className="dishesMenu">{t("dishes.menu")}</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {t(dish.name)} — {t(dish.type)} — {dish.price}₽
            <button onClick={() => handleDelete(dish.id)}>
              {t("dishes.delete")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;
