const ticketModel = require('../models/ticketModel');
const { verifyCustomer } = require('../services/customerService');

// Crear Ticket (con Validación Inter-servicio)
const createTicket = async (req, res) => {
  const { id, cliente_id, servicio_afectado, tipo_incidencia, descripcion, prioridad } = req.body;

  if (!id || !cliente_id || !servicio_afectado || !tipo_incidencia || !descripcion) {
    return res.status(400).json({ 
      message: 'Faltan campos obligatorios: id, cliente_id, servicio_afectado, tipo_incidencia, descripcion' 
    });
  }

  try {
    // 1. Comunicación Inter-servicio: Verificar existencia del cliente en Customer-Service
    const cliente = await verifyCustomer(cliente_id);

    if (!cliente) {
      return res.status(400).json({ 
        error: 'Validación fallida: El cliente ingresado no existe en el sistema de TIGO.' 
      });
    }

    // 2. Regla de negocio: Verificar que el cliente no esté suspendido
    if (cliente.estado_cuenta !== 'ACTIVO') {
      return res.status(400).json({ 
        error: `El cliente '${cliente.nombre}' está en estado ${cliente.estado_cuenta}. No se puede abrir un ticket de soporte.` 
      });
    }

    // 3. Crear el ticket en PostgreSQL
    const newTicket = await ticketModel.createTicket(req.body);

    res.status(201).json({
      message: 'Ticket de soporte creado exitosamente.',
      ticket: newTicket,
      clienteValidado: {
        nombre: cliente.nombre,
        estado: cliente.estado_cuenta
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.findAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTicketsByCustomer = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const tickets = await ticketModel.findTicketsByCustomer(clienteId);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { estado, prioridad } = req.body;

  try {
    const updatedTicket = await ticketModel.updateTicketStatus(id, estado, prioridad);
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketsByCustomer,
  updateTicket
};