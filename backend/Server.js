const express = require("express");
const mongoose = require("mongoose");
const applicationRoutes = require("./routes/applicationRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Dhaniti API is running"
  });
});

app.use("/api/applications", applicationRoutes);



app.listen(process.env.PORT,()=>{
    console.log("server is listening on port 5000")

})

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB is connected");})
  .catch((error) => {
    console.log("DB is not connected");
    console.log(error.message);
  });