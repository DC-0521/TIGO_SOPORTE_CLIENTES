const customerModel = require('../models/customerModel');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.findAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await customerModel.findCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { id, nombre, identificacion } = req.body;
  
  if (!id || !nombre || !identificacion) {
    return res.status(400).json({ message: 'Campos requeridos: id, nombre, identificacion' });
  }

  try {
    const newCustomer = await customerModel.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer
};