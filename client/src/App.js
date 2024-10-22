import React, { useState, useEffect } from "react";

function App() {
  const [dishes, setDishes] = useState([]);
  
  const [data, setData] = useState('');
  const [format, setFormat] = useState('');
  // Функция для загрузки блюд с сервера
  const loadDishes = async () => {
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  // Функция для удаления блюда
  const deleteDish = async (index) => {
    try {
      const response = await fetch(`/api/data/${index}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error("Ошибка при удалении данных:", error);
    }
  };

  // Функция для скачивания данных в формате JSON
  const downloadJSON = () => {
    window.location.href = "/api/data";
  };

  // Функция для скачивания данных в формате XML
  const downloadXML = () => {
    window.location.href = "/api/data/formatted";
  };

  return (
    <div className="App">
      <h1>Блюда кейтеринга</h1>
      <div id="dishes">
        {dishes.length > 0 ? (
          dishes.map((dish, index) => (
            <div key={index}>
              {dish.name} - {dish.description}{" "}
              <button onClick={() => deleteDish(index)}>Удалить</button>
            </div>
          ))
        ) : (
          <p>Нет доступных блюд</p>
        )}
      </div>
      <button onClick={loadDishes}>Загрузить блюда</button>
      <button onClick={downloadJSON}>Скачать JSON</button>
      <button onClick={downloadXML}>Скачать XML</button>
    </div>
  );
}

export default App;
