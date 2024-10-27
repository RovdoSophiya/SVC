const pool = require("../db");

// Создание нового клиента с проверкой на существование логина
const createClient = async (clientData) => {
  const { lastname, name, fathername, email, phone, address, password } =
    clientData;

  try {
    await pool.query("BEGIN");

    // Проверка на существование пользователя с таким же логином
    const checkUserQuery = 'SELECT 1 FROM "User" WHERE login = $1';
    const userExists = await pool.query(checkUserQuery, [email]);
    if (userExists.rows.length > 0) {
      // Логин уже существует, откат транзакции
      await pool.query("ROLLBACK");
      throw new Error("Пользователь с таким логином уже существует");
    }

    // 1. Добавление записи в таблицу `client`
    const clientQuery = `
         INSERT INTO "Client" (lastname, name, fathername, email, phone, address)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id;
         `;

    const clientValues = [lastname, name, fathername, email, phone, address];
    const clientResult = await pool.query(clientQuery, clientValues);
    const clientId = clientResult.rows[0].id;

    // 2. Добавление записи в таблицу `user` с использованием clientId
    const userQuery = `
         INSERT INTO "User" (login, password, role, clientid)
         VALUES ($1, $2, 'Client', $3)
         RETURNING id;
        `;
    const hashedPassword = password;
    const userResult = await pool.query(userQuery, [
      email,
      hashedPassword,
      clientId,
    ]);

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
  const values = [clientId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Удаление клиента из обеих таблиц
const deleteClient = async (clientId) => {
  try {
    await pool.query("BEGIN");

    // Удаление из таблицы `user`
    const deleteUserQuery = 'DELETE FROM "User" WHERE clientid = $1';
    await pool.query(deleteUserQuery, [clientId]);

    // Удаляем из таблицы `client`
    const deleteClientQuery = `DELETE FROM "Client" WHERE id = $1`;
    await pool.query(deleteClientQuery, [clientId]);

    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

// Обновление данных клиента (кроме email)
const updateClient = async (clientId, updateData) => {
  const { lastname, name, fathername, phone, address, password } = updateData;

  try {
    await pool.query("BEGIN");

    // Обновление данных в таблице `client`
    const clientQuery = `
            UPDATE "Client"
            SET lastname = $1, name = $2, fathername = $3, phone = $4, address = $5
            WHERE id = $6
            RETURNING *;
        `;
    const clientValues = [lastname, name, fathername, phone, address, clientId];
    const clientResult = await pool.query(clientQuery, clientValues);

    // Если передан новый пароль, обновляем в таблице `user`
    if (password) {
      const userQuery = 'UPDATE "User" SET password = $1 WHERE clientid = $2';
      const hashedPassword = password;
      await pool.query(userQuery, [hashedPassword, clientId]);
    }

    await pool.query("COMMIT");
    return clientResult.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

module.exports = { createClient, getClientById, deleteClient, updateClient };
