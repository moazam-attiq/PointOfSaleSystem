const express = require("express");
const router = express.Router();
const { createPayment, getAllPayments, getPaymentByOrderId, getSalesRecord } = require("../controllers/paymentController");

router.post("/", createPayment);
router.get("/", getAllPayments); // If needed
router.get('/order/:orderId', getPaymentByOrderId);
router.get("/getSales", getSalesRecord);

module.exports = router;
