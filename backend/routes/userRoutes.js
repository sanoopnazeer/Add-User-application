const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/registerUser", async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, gender, status, location } =
      req.body;
    const user = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      gender,
      status,
      location,
    });
    return res
      .status(200)
      .json({ user, status: true, message: "Registration Successfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

router.post("/upload/:id", async (req, res) => {
  try {
    const newUserId = req.params.id;
    const imageFile = req.files.image;
    imageFile.mv(
      path.join(__dirname, "..", "uploads", newUserId + ".jpg"),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to upload image" });
        }
      }
    );
    return res.status(200).json({status: true})
  } catch (error) {
    console.log(error);
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

router.get("/image/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const imagePath = path.join(__dirname, "..", "uploads", `${userId}.jpg`);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading the image file");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  } catch (error) {}
});

router.post("/updateStatus", async (req, res) => {
  try {
    const { status, userId } = req.body;
    const updated = await User.updateOne(
      { _id: userId },
      { $set: { status: status } }
    );
    return res.status(200).json({ status: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Someting went wrong" });
  }
});

router.get("/getUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.status(200).json({ user, status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Someting went wrong" });
  }
});

router.post("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findOneAndUpdate({ _id: id }, req.body);
    return res.status(200).json({ status: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Someting went wrong" });
  }
});

module.exports = router;
