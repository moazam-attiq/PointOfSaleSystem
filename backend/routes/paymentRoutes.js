const express = require('express');
const router = express.Router();
const { createPayment, getAllPayments } = require('../controllers/paymentController');

router.post('/', createPayment);
router.get('/', getAllPayments);

module.exports = router;
