const express = require('express');
const router = express.Router();
const { createRefund, getAllRefunds, searchCustomer, getOrderById } = require('../controllers/refundController');

router.post("/", createRefund);
router.get("/", getAllRefunds);
router.get("/search-customer", searchCustomer); // For dropdown
router.get("/payment/:orderId", getOrderById); 

module.exports = router;
