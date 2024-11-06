import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "../features/dishesSlice";
import filterReducer from "../features/filterSlice"; 

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    filter: filterReducer, 
  },
});

export default store;