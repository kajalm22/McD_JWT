const jwt = require ("jsonwebtoken") 
const bcrypt = require ("bcrypt") 
const User = require ("../models/userModel") 


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

module.exports = {registerUSer,  getUser, loginUser}