import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    //1. check for token
    const token = req.headers.authorization;

    if (token) {
      // 2. verify the token
      const tokenData = jwt.verify(token, process.env.JWT_SECRET);
      console.log(tokenData);
      // 3. find user from the email
      const user = await User.findOne({ email: tokenData.email });

      if (user) {
        user.password = "";
        req.user = user;

        next();
      } else {
        return res.send({
          status: "error",
          message: "Invalid User",
        });
      }
    } else {
      return res.send({
        status: "error",
        message: "No Token!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: "error",
      message: "Token verification failed!",
    });
  }
};
