import React, { useState, useEffect } from "react";
import ClientMain from "../_components/clientMain/clientMain";
import Description from "../_components/description/description";

const Client = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);

    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
      setUserId(userId);
      if (userId) {
        let response;
        if (role === "client") {
          response = await fetch(`http://localhost:5000/api/clients/${userId}`);
        } else if (role === "courier") {
          response = await fetch(
            `http://localhost:5000/api/couriers/${userId}`
          );
        }
        const data = await response.json();
        setUser(data); // Сохраняем данные пользователя
      }
      setLoading(false); // Устанавливаем состояние загрузки в false
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <ClientMain
        user={user}
        userRole={userRole}
        userId={userId}
        loading={loading}
      />
      <Description />
    </div>
  );
};

export default Client;
