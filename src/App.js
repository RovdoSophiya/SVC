import React from "react";
import DishList from "./components/DishList";
import AddDishForm from "./components/AddDishForm";
import DishFilter from "./components/DishFilter";

const App = () => {
  return (
    <div>
      <h1>Кейтеринг Меню</h1>
      <DishFilter />
      <AddDishForm />
      <DishList />
    </div>
  );
};

export default App;
