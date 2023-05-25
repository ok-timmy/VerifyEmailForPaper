const express = require("express");
const verifyEmailRoute = require("./Routes/verifyEmail");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/", verifyEmailRoute);

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
