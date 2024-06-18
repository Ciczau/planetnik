//@ts-nocheck

import express, { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import {
  validateUserLogin,
  validateUserRegister,
} from "../utils/validateUser.js";

const expiration = "168h";
const router = express.Router();

router.post("/refresh", (req: Request, res: Response) => {
  const { token } = req.body;
  const decodedToken = jwt.decode(token);
  return token
    ? res.json({
        success: true,
        token: jwt.sign(
          {
            _id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: expiration,
          }
        ),
      })
    : res.json({ success: false, message: "Invalid token" });
});

router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  //   const { error } = validateUserRegister(req.body);
  //   if (error) {
  //     return res.json({ success: false, message: error.details });
  //   }
  try {
    const isMailFinded = await User.findOne({ email: email }).exec();
    if (isMailFinded)
      return res.json({
        success: false,
        message: "Ten email jest już zajęty!",
        field: "email",
      });
  } catch (e) {
    console.error("error during registration: " + e);
    return res.json({ success: false, message: e });
  }

  let user = new User();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  try {
    await user.save();
    console.log("user saved to database");
    return res.json({ success: true });
  } catch (e) {
    console.error("error durning saving user to database: " + e);
    return res.json({ success: false, message: e });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   const { error } = validateUserLogin(req.body);

  //   if (error) {
  //     return res.json({ success: false, message: error.details });
  //   }

  const existingUser = await User.findOne({ email: email }).exec();
  if (!existingUser) {
    return res.json({
      success: false,
      field: "email",
      message: "Nie ma użytkownika o podanym adresie email!",
    });
  }
  const correctPassword = await bcrypt.compare(password, existingUser.password);

  if (correctPassword) {
    return res.json({
      success: true,
      token: jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: expiration,
        }
      ),
    });
  } else {
    return res.json({
      success: false,
      field: "password",
      message: "Podane hasło jest błędne!",
    });
  }
});

router.post("/update", async (req, res) => {
  const { _id, name, email } = req.body;
  const user = await User.findById(_id).exec();
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  user.name = name;
  user.email = email;
  try {
    await user.save();
    return res.json({ success: true });
  } catch (e) {
    console.error("error during updating user data: " + e);
    return res.json({ success: false, message: e });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.password = undefined;
    res.json({ success: true, user: user });
  } catch (e) {
    console.error("Error during fetching user:" + e);
    res.status(500).json({ success: false, error: e });
  }
});

router.post("/logout", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({ success: false, error: "Invalid token" });
  }
  try {
    await User.updateOne({ token: token }, { token: "" });
  } catch (e) {
    console.error("Error during logout: " + e);
    return res.json({ success: false, error: e });
  }
  return res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id);
    res.json({ success: true });
  } catch (e) {
    console.log("Error durning deletion user account process");
    return res.json({ success: false, message: e });
  }
});

export { router };
