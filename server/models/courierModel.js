const pool = require("../db");

// Создание нового курьера с проверкой на существование логина
const createCourier = async (couirerData) => {
  const {
    lastname,
    name,
    fathername,
    phone,
    email,
    vehicletype,
    available,
    password,
  } = couirerData;

  try {
    await pool.query("BEGIN");

    // Проверка на существование email в обеих таблицах
    const emailCheckQuery = `
      SELECT 1 FROM "Client" WHERE email = $1
      UNION
      SELECT 1 FROM "Courier" WHERE email = $1;
    `;
    const emailExists = await pool.query(emailCheckQuery, [email]);
    if (emailExists.rows.length > 0) {
      await pool.query("ROLLBACK");
      throw new Error("Пользователь с таким email уже существует");
    }

    // Добавление записи в таблицу `Courier`
    const courierQuery = `
   INSERT INTO "Courier" (lastname, name, fathername, email, phone, vehicletype, available, password)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
   RETURNING id;
 `;
    const courierValues = [
      lastname,
      name,
      fathername,
      email,
      phone,
      vehicletype,
      available,
      password,
    ];
    const courierResult = await pool.query(courierQuery, courierValues);

    await pool.query("COMMIT");
    return courierResult.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

// Получение информации о клиенте
const getCourierById = async (courierId) => {
  const query = `SELECT * FROM "Courier" WHERE "id" = $1`;
  const result = await pool.query(query, [courierId]);
  return result.rows[0];
};

// Удаление курьера
const deleteCourier = async (courierId) => {
  const deleteCourierQuery = `DELETE FROM "Courier" WHERE id = $1`;
  await pool.query(deleteCourierQuery, [courierId]);
};

/// Обновление курьера (кроме email)
const updateCourier = async (courierId, updateData) => {
  const {
    lastname,
    name,
    fathername,
    phone,
    vehicletype,
    available,
    password,
  } = updateData;
  const courierQuery = `
    UPDATE "Courier"
    SET lastname = $1, name = $2, fathername = $3, phone = $4, vehicletype = $5, available = $6, password = $7
    WHERE id = $8
    RETURNING *;
  `;
  const courierValues = [
    lastname,
    name,
    fathername,
    phone,
    vehicletype,
    available,
    password,
    courierId,
  ];
  const courierResult = await pool.query(courierQuery, courierValues);
  return courierResult.rows[0];
};

module.exports = {
  createCourier,
  getCourierById,
  deleteCourier,
  updateCourier,
};
