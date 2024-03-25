const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const paymentRoutes = require("./Routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is Runnig");
});
