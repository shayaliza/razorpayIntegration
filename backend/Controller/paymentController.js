const crypto = require("crypto");
const Razorpay = require("razorpay");

const keyID = "rzp_test_El6TVaCcp8aTF7";
const keySecret = "fWaASR4z0DJ2YFczPqzk0XFR";

const instance = new Razorpay({
  key_id: keyID,
  key_secret: keySecret,
});

const Checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order: order });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const PaymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    console.log("is authentic");
    res.redirect(`http://localhost:5173/`); //redirect to payment success page of frontend
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
module.exports = {
  PaymentVerification,
  Checkout,
};
