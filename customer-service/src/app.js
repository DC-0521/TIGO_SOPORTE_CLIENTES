const express = require('express');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`[Customer-Service] corriendo en http://localhost:${PORT}`);
});