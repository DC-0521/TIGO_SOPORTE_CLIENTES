const pool = require('../config/db');

const findAllCustomers = async () => {
  const query = 'SELECT * FROM clientes ORDER BY fecha_registro DESC';
  const result = await pool.query(query);
  return result.rows;
};

const findCustomerById = async (id) => {
  const clientQuery = 'SELECT * FROM clientes WHERE id = $1';
  const clientResult = await pool.query(clientQuery, [id]);

  if (clientResult.rows.length === 0) {
    return null;
  }

  const servicesQuery = 'SELECT * FROM servicios_contratados WHERE cliente_id = $1';
  const servicesResult = await pool.query(servicesQuery, [id]);

  return {
    ...clientResult.rows[0],
    servicios: servicesResult.rows
  };
};

const createCustomer = async (customerData) => {
  const { id, nombre, identificacion, estado_cuenta } = customerData;
  const query = `
    INSERT INTO clientes (id, nombre, identificacion, estado_cuenta)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [id, nombre, identificacion, estado_cuenta || 'ACTIVO'];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  findAllCustomers,
  findCustomerById,
  createCustomer
};