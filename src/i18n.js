// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        dishes: {
          menuTitle: "Catering menu",
          appetizer: "Appetizer",
          main: "Main Course",
          dessert: "Dessert",
          all: "All",
          addDish: "Add Dish",
          price: "Price",
          filterByType: "Filter by Dish Type",
          error: "Price need to be positive",
          menu: "Menu",
          delete: "Delete",
          "Caesar Salad": "Caesar Salad",
          Carbonara: "Carbonara",
          Tiramisu: "Tiramisu",
          Borscht: "Borscht",
          Steak: "Steak",
          "Panna Cotta": "Panna Cotta",
          "Olivier Salad": "Olivier Salad",
          Lasagna: "Lasagna",
          "Creme Brulee": "Creme Brulee",
          "Chicken Soup": "Chicken Soup",
          "Greek Salad": "Greek Salad",
          "Mushroom Risotto": "Mushroom Risotto",
          Cheesecake: "Cheesecake",
          "Pumpkin Soup": "Pumpkin Soup",
          "Meat Pies": "Meat Pies",
        },
      },
    },
    ru: {
      translation: {
        dishes: {
          menuTitle: "Кейтеринг меню",
          appetizer: "Закуска",
          main: "Основное блюдо",
          dessert: "Десерт",
          all: "Все",
          addDish: "Добавить блюдо",
          price: "Цена",
          filterByType: "Фильтр по типу блюда",
          error: "Цена должна быть положительной",
          menu: "Меню",
          delete: "Удалить",
          "Caesar Salad": "Салат Цезарь",
          Carbonara: "Карбонара",
          Tiramisu: "Тирамису",
          Borscht: "Борщ",
          Steak: "Стейк из говядины",
          "Panna Cotta": "Панна Котта",
          "Olivier Salad": "Оливье",
          Lasagna: "Лазанья",
          "Creme Brulee": "Крем-брюле",
          "Chicken Soup": "Куриный суп",
          "Greek Salad": "Греческий салат",
          "Mushroom Risotto": "Ризотто с грибами",
          Cheesecake: "Чизкейк",
          "Pumpkin Soup": "Суп-пюре из тыквы",
          "Meat Pies": "Пирожки с мясом",
        },
      },
    },
  },
  lng: "ru", // Язык по умолчанию
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
