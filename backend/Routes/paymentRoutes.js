const express = require("express");

const {
  Checkout,
  PaymentVerification,
} = require("./../Controller/paymentController");
const router = express.Router();

router.post("/checkout", Checkout);
router.post("/paymentverification", PaymentVerification);

module.exports = router;
