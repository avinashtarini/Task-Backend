const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { generateToken, JWTMiddleware } = require("../tokenAuth");
const UserModel = require("../model/user");
const { constants, passwordRegex, emailRegex } = require("../constants");

const router = express.Router();
const userNameMinLength = process.env.MIN_USERNAME_LENGTH;
const userNameMaxLength = process.env.MAX_USERNAME_LENGTH;
const passwordRegexExp = new RegExp(passwordRegex);
const emailRegexExp = new RegExp(emailRegex);
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (username.length < userNameMinLength) {
      res.status(400).send({
        message: constants.userNameMinCharErr,
      });
      return;
    }
    if (username.length > userNameMaxLength) {
      res.status(400).send({
        message: constants.userNameMaxCharErr,
      });
      return;
    }

    if (!emailRegexExp.test(email)) {
      res.status(400).send({
        message: constants.emailAlert,
      });
      return;
    }

    if (!passwordRegexExp.test(password)) {
      res.status(400).send({
        message: constants.passwordAlert,
      });
      return;
    }

    const isEmailAvailable = await UserModel.findOne({ email });

    if (isEmailAvailable) {
      res.status(400).send({
        message: constants.emailAlreadyRegistered,
      });
      return;
    }
    const saltRound = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    const token = generateToken(email);
    const response = await UserModel.create({
      username,
      password: encryptedPassword,
      email,
    });
    const user = response.toJSON();
    res.status(201).send({
      user: { ...user, token },
      message: constants.userCreated,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!emailRegexExp.test(email)) {
      res.status(400).send({
        message: constants.emailAlert,
      });
      return;
    }
    if (!passwordRegexExp.test(password)) {
      res.status(400).send({
        message: constants.passwordAlert,
      });
      return;
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400);
      res.send({ message: constants.noUserWithEmailAlert });
      return;
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      res.status(401).send({ message: constants.invalidPassword });
    } else {
      const token = generateToken(user.email);
      const data = user.toJSON();
      delete data.password;
      res.status(200).send({
        user: { ...data, token },
        message: constants.loginSuccess,
      });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.get("/user", JWTMiddleware, async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: constants.idIsEmpty,
    });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }

  const objId = new mongoose.Types.ObjectId(id);

  const user = await UserModel.findById({ _id: objId });
  if (!user) {
    res.status(400);
    res.send({ message: constants.userNotFount });
    return;
  }
  const token = generateToken(user.email);
  const data = user.toJSON();
  delete data.password;
  res.status(200).send({
    user: { ...data, token },
  });
});

module.exports = router;
