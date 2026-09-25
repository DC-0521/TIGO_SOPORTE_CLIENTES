const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getAllTickets);
router.post('/', ticketController.createTicket);
router.get('/cliente/:clienteId', ticketController.getTicketsByCustomer);
router.put('/:id', ticketController.updateTicket);

module.exports = router;