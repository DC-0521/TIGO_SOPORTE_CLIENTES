const pool = require('../config/db');

// Insertar ticket
const createTicket = async (ticketData) => {
  const { id, cliente_id, servicio_afectado, tipo_incidencia, descripcion, prioridad } = ticketData;
  const query = `
    INSERT INTO tickets (id, cliente_id, servicio_afectado, tipo_incidencia, descripcion, prioridad, estado)
    VALUES ($1, $2, $3, $4, $5, $6, 'ABIERTO')
    RETURNING *`;
  const values = [id, cliente_id, servicio_afectado, tipo_incidencia, descripcion, prioridad || 'MEDIA'];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Consultar todos los tickets
const findAllTickets = async () => {
  const query = 'SELECT * FROM tickets ORDER BY fecha_creacion DESC';
  const result = await pool.query(query);
  return result.rows;
};

// Consultar tickets por ID de cliente
const findTicketsByCustomer = async (clienteId) => {
  const query = 'SELECT * FROM tickets WHERE cliente_id = $1 ORDER BY fecha_creacion DESC';
  const result = await pool.query(query, [clienteId]);
  return result.rows;
};

// Actualizar ticket (Estado / Prioridad)
const updateTicketStatus = async (id, estado, prioridad) => {
  const query = `
    UPDATE tickets
    SET estado = COALESCE($1, estado),
        prioridad = COALESCE($2, prioridad),
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *`;
  const result = await pool.query(query, [estado, prioridad, id]);
  return result.rows[0];
};

module.exports = {
  createTicket,
  findAllTickets,
  findTicketsByCustomer,
  updateTicketStatus
};