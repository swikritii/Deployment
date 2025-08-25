import employeeModel from "../models/employee.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginEmployee(req, res) {
  try {
    //Extract email and password

    const { email, password } = req.body;

    //check if email or password is entered
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    //check if email is present in database
    const user = await employeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //Compare passwords

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //sign token

    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token to frotend as a response
    res.status(200).json({
      message: "Login successful.",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.log("Error while login:", error);
    res.status(500).josn({ message: "Internal Server Error" });
  }
}
