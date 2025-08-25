
import express from 'express';
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeesByID, updateEmployee } from './controllers/employee.controller.js';
import { loginEmployee } from './controllers/auth.controller.js';
import { authorizeToken } from './middleware/auth.middleware.js';
import { checkRole } from './middleware/auth.middleware.js';

dotenv.config();

const app=express();

const PORT=process.env.PORT;

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



app.get("/",authorizeToken,(req,res) => {
    res.status(200).json({message:"Token verified"});
});

app.post("/employee",createEmployee);
app.get("/employee",authorizeToken,checkRole,getAllEmployees);
app.get("/employee/:id",authorizeToken,getEmployeesByID);
app.put("/employee/:id",updateEmployee);
app.delete("/employee/:id",authorizeToken,deleteEmployee);
app.post("/auth",loginEmployee);

//Route to verify token.
app.get("/",authorizeToken, ()=>{
    res.status(200).json({message:"Token Verified."});
});




//Database connection.
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connection established👍.");

app.listen(PORT, ()=>{
    console.log("Server is running at port:", PORT);
});

}).catch((err)=>{
console.log("Database connection failed.😒",err);
});
