const express = require("express")
const { connect } = require("mongoose")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

const port = process.env.PORT 

const app = express()

connectDB()



app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/orders" , require("./router/orderRoute"))
app.use("/users" , require("./router/userRouter"))

app.listen(port , () => console.log(`Server connected on ${port}`))