import { User } from "../modal/userModal.js";

export const createUser = async (req, res) => {
  try {
    let newUser = req.body;

    let data = await User.insertOne(newUser);
    return res.send({
      status: "Success",
      messgae: "user created successfully",
      user: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error creating User",
    });
  }
};
