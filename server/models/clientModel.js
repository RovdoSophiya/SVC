const pool = require("../db");

// Создание нового клиента с проверкой на существование логина
const createClient = async (clientData) => {
  const { lastname, name, fathername, email, phone, address, password } =
    clientData;

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

    // Добавление записи в таблицу `Client`
    const clientQuery = `
     INSERT INTO "Client" (lastname, name, fathername, email, phone, address, password)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id;
   `;
    const clientValues = [
      lastname,
      name,
      fathername,
      email,
      phone,
      address,
      password,
    ];
    const clientResult = await pool.query(clientQuery, clientValues);

    await pool.query("COMMIT");
    return clientResult.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

// Получение информации о клиенте
const getClientById = async (clientId) => {
  const query = `SELECT * FROM "Client" WHERE "id" = $1`;
  const result = await pool.query(query, [clientId]);
  return result.rows[0];
};

// Удаление клиента
const deleteClient = async (clientId) => {
  const deleteClientQuery = `DELETE FROM "Client" WHERE id = $1`;
  await pool.query(deleteClientQuery, [clientId]);
};

// Обновление клиента (кроме email)
const updateClient = async (clientId, updateData) => {
  const { lastname, name, fathername, phone, address, password } = updateData;
  const clientQuery = `
    UPDATE "Client"
    SET lastname = $1, name = $2, fathername = $3, phone = $4, address = $5, password = $6
    WHERE id = $7
    RETURNING *;
  `;
  const clientValues = [
    lastname,
    name,
    fathername,
    phone,
    address,
    password,
    clientId,
  ];
  const clientResult = await pool.query(clientQuery, clientValues);
  return clientResult.rows[0];
};

module.exports = { createClient, getClientById, deleteClient, updateClient };
