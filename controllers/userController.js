const jwt = require ("jsonwebtoken") 
const bcrypt = require ("bcrypt") 
const User = require ("../models/userModel") 
const nodemailer = require("nodemailer")
const transporter = require("../config/emailConfig")


const registerUSer = (async (req,res)=>{

    const {name, email, password} = req.body  

    
    if(!name || !email || !password){
        res.status(400).json("All fields should be filled ")

    }

 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400).json("User already exists")

        
    }

    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword 
    })

    if(user){
        res.status(201).json({             
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)  
        })
    }else{
        res.status(400).json("Invalid user ID")
        
        
    }
})

const getUser = (async (req,res)=> {

    const {_id, name, email}= await User.findById(req.user.id) 

    res.status(200).json({
        _id: _id,
        name,
        email
    })
})


const loginUser = (async (req,res) =>{

    const {email, password} = req.body

    
    const user = await User.findOne({email}) 

    if(user && (await bcrypt.compare(password, user.password)) ){

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)

        throw new Error("Invalid Credentials")
    }

})

const generateToken = (id) => {                                  

    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {             
        expiresIn: "30d"
    })
}

const sendUserPasswordResetEmail = (async ( req , res) => {
    const { email } = req.body
    if(email){
        const user = await User.findOne({email : email})
        const secret = user._id + process.env.JWT_SECRET_KEY

        if(user){
            const token = jwt.sign( {id : user._id} , secret , {expiresIn: "15m"})
            const link = `http://localhost:5000/users/passwordResetMail/${user._id}/${token}`
            console.log(link)

            let info = transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "McD password reset link",
                html:`<a href=${link}>Click here </a> to reset your password`
            })
            res.status(200).json({ msg : "Password reset email sent. Please check your email" })

        }else{
            res.status(500).json({ msg : "Email does not exist"})

        }

    }else{
        res.status(500).json({msg : "Email field is required"})
    }

})

const userPassword = ( async ( req , res) => {
    const { password } = req.body
    const { id , token } = req.params

    const user = await User.findById(id)
    console.log(user)
    const newSecret = user._id + process.env.JWT_SECRET_KEY
    // console.log(newSecret)

    try {

        jwt.verify(token , newSecret)
        if(!password ){

            
                res.status(500).json({ msg : "Password is required"})

            }else{
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                await User.findByIdAndUpdate(user._id, { $set: {password: hashedPassword}})
                // console.log(hashedPassword) 
            
            res.status(200).json({msg: "Password changed successfully"})
            }
        
        
    }catch (error) {
        console.log(error)
        res.status(500).json({ msg : "Password is required"})
    }
})

module.exports = {registerUSer,  getUser, loginUser, sendUserPasswordResetEmail , userPassword}