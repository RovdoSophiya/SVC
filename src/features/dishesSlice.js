//слайс для управления блюдами
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dishes: [
    { id: 1, name: "Caesar Salad", type: "Закуска", price: 250 },
    { id: 2, name: "Carbonara", type: "Основное блюдо", price: 500 },
    { id: 3, name: "Tiramisu", type: "Десерт", price: 300 },
    { id: 4, name: "Borscht", type: "Суп", price: 200 },
    { id: 5, name: "Steak", type: "Основное блюдо", price: 1200 },
    { id: 6, name: "Panna Cotta", type: "Десерт", price: 350 },
    { id: 7, name: "Olivier Salad", type: "Закуска", price: 280 },
    { id: 8, name: "Lasagna", type: "Основное блюдо", price: 600 },
    { id: 9, name: "Creme Brulee", type: "Десерт", price: 320 },
    { id: 10, name: "Chicken Soup", type: "Суп", price: 210 },
    { id: 11, name: "Greek Salad", type: "Закуска", price: 240 },
    { id: 12, name: "Mushroom Risotto", type: "Основное блюдо", price: 550 },
    { id: 13, name: "Cheesecake", type: "Десерт", price: 380 },
    { id: 14, name: "Pumpkin Soup", type: "Суп", price: 250 },
    { id: 15, name: "Meat Pies", type: "Закуска", price: 180 },
  ],
  filter: 'Все',
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addDish: (state, action) => {
      state.dishes.push(action.payload);
    },
    updateDish: (state, action) => {
      const index = state.dishes.findIndex(dish => dish.id === action.payload.id);
      if (index !== -1) {
        state.dishes[index] = action.payload;
      }
    },
    deleteDish: (state, action) => {
      state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addDish, updateDish, deleteDish, setFilter } = dishesSlice.actions;
export default dishesSlice.reducer;