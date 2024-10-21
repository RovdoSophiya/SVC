import { configureStore } from '@reduxjs/toolkit';
import dishesReducer from '../features/dishesSlice';

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
  },
});

export default store;