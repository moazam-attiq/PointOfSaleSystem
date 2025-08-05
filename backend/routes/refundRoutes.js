const express = require('express');
const router = express.Router();
const { createRefund, getAllRefunds, searchCustomer, getOrderById, getRefundById } = require('../controllers/refundController');

router.post("/", createRefund);
router.get("/", getAllRefunds);
router.get("/search-customer", searchCustomer);
router.get("/payment/:orderId", getOrderById); 
router.get("/:id", getRefundById);

module.exports = router;
