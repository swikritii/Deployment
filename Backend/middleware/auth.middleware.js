import jwt from "jsonwebtoken";

export function authorizeToken(req,res,next){
//Extract token from headers
const authHeader = req.headers.authorization;


//check if token is available
if(!authHeader || !authHeader.startsWith("Bearer"))
{
return res.status(400).json({message:"No token provided."});
}
//split token

const token = authHeader.split(" ")[1];

try {
    //verify token
    const decoded =  jwt.verify(token,process.env.JWT_SECRET);
req.user =decoded;
    
     //if verified , check roles 

    const {userType} = decoded;
    if(userType.toLowerCase==="Employee"){
    return res.status(400).json({message:"Access Denied"})
    }
    next();
} catch (error) {
     //not verified send error message
 console.log("Error while verifying token.",error);
 res.status(400).json({message: "Invalid Token."});
}
}


export function checkRole(req,res,next){
    const user=req.user;
    const{userType}=user;
if(userType.toLowerCase()==="employee"){
    return res.status(400).json({message:"Access Denied"});

}
next();
}