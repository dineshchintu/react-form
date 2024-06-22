const express = require("express");
const app = express();
const PORT = 8082;
const DB_URL = "mongodb://127.0.0.1:27017/short-url";
const mongoose = require("mongoose");
const FormRoute = require("./routes/form.route");
const cors = require("cors")

mongoose
  .connect(`${DB_URL}`)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Found error", err);
  });

  const logNotFound = (req, res, next) => {
    console.log(`Path ${req} not found`);
    next()
  }

app.use(express.json());
//frontend se joh data aa raha woh json data nahi ek form data aa raha so urlencoded needed
app.use(express.urlencoded({extended: false})); // form data ko parse karne mein help karta hai
app.use(cors());

app.use("/form", FormRoute);
app.use("*", logNotFound);

app.listen(PORT, () => {
  console.log(`Listening to server, ${PORT}`);
});
