const axios = require('axios');
require('dotenv').config();

const verifyCustomer = async (clienteId) => {
  try {
    const url = `${process.env.CUSTOMER_SERVICE_URL}/${clienteId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Error de comunicación con Customer-Service: ${error.message}`);
  }
};

module.exports = { verifyCustomer };