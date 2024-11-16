const Client = require("../models/Client");
const Courier = require("../models/Courier");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Регистрация клиента
const registerClient = async (req, res) => {
  const { email, password, name, lastname, fathername, phone, address } =
    req.body;

  try {
    // Проверка на существующий email в обеих таблицах
    const existingClient = await Client.findOne({ where: { email } });
    const existingCourier = await Courier.findOne({ where: { email } });

    if (existingClient || existingCourier) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingPhone = await Client.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone already exists." });
    }
    // Создание нового клиента
    const newClient = await Client.create({
      email,
      password,
      name,
      lastname,
      fathername: fathername || null,
      phone,
      address,
    });

    // Возвращаем идентификатор и роль нового клиента
    res.status(201).json({
      id: newClient.id,
      role: "client",
      message: "Client registered successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Авторизация
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Поиск пользователя среди клиентов и курьеров
    let user =
      (await Client.findOne({ where: { email } })) ||
      (await Courier.findOne({ where: { email } }));

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Проверка пароля
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Если все проверки прошли успешно, возвращаем ответ
    res.status(200).json({
      message: "Login successful",
      role: user instanceof Client ? "client" : "courier",
      user: { id: user.id, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerClient,
  loginUser,
};
