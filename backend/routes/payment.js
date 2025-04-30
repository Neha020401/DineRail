// backend/routes/payment.js
const express = require("express");
const router = express.Router();

// Dummy payment API endpoint
router.post("/process-payment", (req, res) => {
  const { amount, paymentMethod, userId } = req.body;

  // Simulate some payment logic here
  const isPaymentSuccessful = Math.random() > 0.2; // 80% success rate

  if (isPaymentSuccessful) {
    return res.status(200).json({
      success: true,
      message: "Payment processed successfully!",
      paymentDetails: {
        amount,
        paymentMethod,
        userId,
      },
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Payment failed. Try again!",
    });
  }
});

module.exports = router;
