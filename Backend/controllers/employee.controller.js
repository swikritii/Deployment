import { UNSAFE_ErrorResponseImpl } from "react-router-dom";
import employeeModel from "../models/employee.model.js";
import bcrypt from "bcrypt";

export const createEmployee = async (req, res) => {
  try {
    // 1 extract employee data from frontent
    const { name, email, designation, department, salary, password, userType } =
      req.body;

    // 2 validate the data such as email, password, name and all
    if (
      !name ||
      !email ||
      !designation ||
      !department ||
      !salary ||
      !password ||
      !userType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //3 check if email already exists on database or not?
    const isemployeeExists = await employeeModel.findOne({ email });
    if (isemployeeExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

//hashing pw
    const hashedPassword = await bcrypt.hash(password, 10)

    //4 store the data in database
    const employeeData = await employeeModel.create({
      name,
      email,
      designation,
      department,
      salary,
      password: hashedPassword,
      userType,
    });
    //5 send sucessfull message
    return res
      .status(200)
      .json({ message: "Employee created successfully", data: employeeData });
  } catch (error) {
    // if any error occurs, send error message
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function getAllEmployees(req, res) {
  try {
    const allEmployee = await employeeModel.find();

    if (allEmployee.length === 0) {
      return res.status(404).json({ message: "No employee datas was found." });
    }

    res.status(200).json({ message: "Data found.", data: allEmployee });
  } catch (error) {
    console.log("Error while getting employees data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getEmployeesByID(req, res) {
  try {
    const id = req.params.id;
    const employee = await employeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json({ message: "Data found.", data: employee });
  } catch (error) {
    console.log("Error while getting employees data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//Function to Update Employee data
export async function updateEmployee(req, res) {
  try {
    let hashedPassword;
    //kun employee ko data update garne ho
    const id = req.params.id;

    //kk update garne ho
    const { name, email, designation, department, userType, salary, password } =
      req.body;



      if(password){
      hashedPassword = await bcrypt.hash(password, 10)
      }
    //la data update garne
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { name, email, designation, department, userType, salary, password :hashedPassword},
      { new: true }
    );

    //message pathaune

    res
      .status(200)
      .json({ message: "Employee Data is updated.", data: updatedEmployee });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: "Email already exists." });
    }
    console.log("Error while updating data.", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function deleteEmployee(req,res){
    try {
        const id=req.params.id;

      const deletedEmployee =  await employeeModel.findByIdAndDelete(id);

      if(!deletedEmployee){
        return res.status(404).json({message:"Employee to be deleted not found."})
      }
   res.status(200).json({message:"Employee data deleted", data:deletedEmployee})
    } catch (error) {
         console.log("Error while deleting data.", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}