require("dotenv").config();
const connectToDb = require("./../db/database");
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./../models/user");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: hashedPassword,
      age: req.body.age,
      about: req.body.about,
      gender: req.body.gender,
      skills: req.body.skills,
      photoURL: req.body.photoURL,
    });
    const savedUser = await newUser.save();
    res.send({
      id: savedUser,
      message: "Data saved to DB",
    });
  } catch (err) {
    res.status(400).send({
      errorMessage: err.message,
      message: "Unable to save data from db",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    console.log(user);

    if (!user) throw new Error("No user found");
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      res.send({
        message: "User successfully loggedin",
        user
      });
    } else {
      throw new Error("Error while loggin in");
    }
  } catch (err) {
    res.send({
      errorMessage: err.message,
      message: "Error occured while login",
    });
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
