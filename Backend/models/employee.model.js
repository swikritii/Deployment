import { Schema } from "mongoose";
import mongoose from "mongoose";

const employeeSchema = new Schema({
    name: String,
    email:{type:String,unique:true},
    designation: String,
    department: String,
    userType: String,
    salary: Number,
    password: String,
},
{timestamps:true});//updates datas timing 

const employeeModel=mongoose.model("Employee",employeeSchema)



export default employeeModel;