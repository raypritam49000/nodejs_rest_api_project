const express = require("express");
const route = express.Router();
const StripeController = require("../controllers/StripeController");

route.post("/payment",StripeController.payment);

module.exports = route;