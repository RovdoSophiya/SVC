const loginUser = async (email, password) => {
  const clientQuery = `SELECT "Client" AS role, id FROM "Client" WHERE "email" = $1 AND "password" = $2`;
  const courierQuery = `SELECT "Courier" AS role, id FROM "Courier" WHERE "email" = $1 AND "password" = $2`;

  const clientResult = await pool.query(clientQuery, [email, password]);
  const courierResult = await pool.query(courierQuery, [email, password]);

  if (clientResult.rows.length > 0) {
    return clientResult.rows[0];
  } else if (courierResult.rows.length > 0) {
    return courierResult.rows[0];
  } else {
    throw new Error("Неверный email или пароль");
  }
};

module.exports = {
  loginUser,
};
