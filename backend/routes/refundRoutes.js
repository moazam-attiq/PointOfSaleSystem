const express = require('express');
const router = express.Router();
const { createRefund, getAllRefunds } = require('../controllers/refundController');

router.post('/', createRefund);
router.get('/', getAllRefunds);

module.exports = router;
