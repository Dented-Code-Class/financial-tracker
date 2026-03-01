import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    // {username, email, password}
    let newUser = req.body;

    newUser.password = bcrypt.hashSync(
      newUser.password,
      parseInt(process.env.SALT) || 10,
    );

    let data = await User.insertOne(newUser);
    return res.send({
      status: "success",
      messgae: "user created successfully",
      user: data,
    });
  } catch (error) {
    console.log(error);

    if (error.message.includes("E11000")) {
      return res.send({
        status: "error",
        message: "Email Already used!",
      });
    }

    return res.send({
      status: "error",
      message: "Error creating User",
    });
  }
};

export const loginUser = async (req, res) => {
  //1. {email, password} -> req.body
  const { email, password } = req.body;

  //2. get user with the email
  const user = await User.findOne({ email });

  if (user) {
    //3. match the password
    // db password = user.passord
    // plain password = password

    const isMatched = bcrypt.compareSync(password, user.password);

    if (isMatched) {
      // 4. generate token
      const payload = { email: user.email };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.send({
        status: "success",
        message: "User logged in",
        token,
      });
    } else {
      return res.status(403).send({
        status: "error",
        message: "Invalid Credentials",
      });
    }
  } else {
    return res.status(404).send({
      status: "error",
      message: "User not found",
    });
  }
};
