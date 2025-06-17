import { UserModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"



export const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        
    //check if all fields are present
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    if(password.length <6){
        return res.status(400).json({message:"Password should be at least 6 characters long"})
    }

    //check if user already exists
    const existingUser = await UserModel.findOne({ email })
    if(existingUser){
        return res.status(400).json({message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password , 10)
    

    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        role: "user"
    })
    await newUser.save();

// Generate token, but DON'T send res inside token function
generateToken(newUser._id, res);

// Now send response
if(newUser){
res.status(201).json({
  _id: newUser._id,
  name: newUser.name,
  email: newUser.email,
});
     } 
     else{
        res.status(400).json({message:"User not created"})
     }

        
    } catch (error) {
        console.log("Error in signup controller", error.message)
        return res.status(500).json({message:"Internal server error"})
    }
    
    
   
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, res); // ✅ capture the token

    return res.status(200).json({
      message: "Login successful",
      token, // ✅ return token here
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0}) //setting the cookie to expire immediately
        res.status(200).json({message:"Logout successful"})
    } 
    catch(error){
        console.log("Error in logout controller", error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}