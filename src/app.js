require("dotenv").config();
const connectToDb = require("./../db/database");
const express = require("express");
const User = require("./../models/user");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    emailId:  req.body.emailId,
    password: req.body.password,
    age: req.body.age,
    about: req.body.about,
    gender: req.body.gender,
    skills: req.body.skills,
    photoURL: req.body.photoURL,
  });
  try {
    const savedUser = await newUser.save();
    res.send({
        id:savedUser,
        message:"Data saved to DB"
    })
  } catch (err) {
    res.status(400).send({
        errorMessage:err,
        message:"Unable to save data from db"
    })
  }
});

connectToDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.err("DB connection error");
  });
