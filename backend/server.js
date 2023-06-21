const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
