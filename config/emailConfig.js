const dotenv = require("dotenv").config()
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    }
  })



  module.exports = transporter

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// })


// const mailOptions = {
//     from: 'mishrakajalr22@gmail.com',
//     to: 'mishrakajalr22@gmail.com',
//     subject: 'Portfolio',
// }

// transporter.sendMail(mailOptions, (err, result) => {
//     if (err){
//     console.log("error")
//         // res.status(500).json('Oops error occurred')
//     } else{
//         console.log("thanks for the mail")
//         // res.status(200).json('thanks for emailing me');
//     }
// })



 