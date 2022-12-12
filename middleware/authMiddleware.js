const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const protect = ( async ( req , res , next)  => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
          
            token = req.headers.authorization.split(" ")[1] 
            console.log(token)

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decoded)
            

            req.user = await User.findById(decoded.id).select("-password")  
            next()

        } catch (error) {

            console.log(error)
            res.status(401)

            throw new Error ("User not Authorized")
            
        } 
    }
        
        if(!token) {

            res.status(401)
            throw new Error ("Not authorized , No token provided")
        
    }

    


//     const { authorization } = req.headers

//     if(authorization && authorization.startsWith("Bearer")){
//         try {
//             token = authorization.split(" ")[1]
//             console.log("TOKEN" ,token)
//             console.log("AUTHORIZATION" ,authorization)

//             const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
//             console.log(decoded.id)

//             req.user = await User.findById(decoded.id).select("-password")
//             next()
            
//         } catch (error) {
//             console.log(error)
//             res.status(401).json("Unauthorized user!")
//         }
//     }
//     if(!token){
//         res.status(400).json("No token provided")
//     }
})

module.exports = { protect }