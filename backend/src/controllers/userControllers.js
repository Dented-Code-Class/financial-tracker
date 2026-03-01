import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

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
