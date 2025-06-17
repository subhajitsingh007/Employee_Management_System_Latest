import jwt from "jsonwebtoken";

export const generateToken = (userId , res ) =>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRY || "7d"
    })

    res.cookie("jwt",token, {
        //7 days in milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true, // prevents XSS attacks
        sameSite:"strict", // prevents CSRF attacks
        secure: process.env.NODE_ENV !== "development",
    })
}