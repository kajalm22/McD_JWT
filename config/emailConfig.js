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

  // EMAIL_PASS = 'vmamvmbffhiyhubz'

  module.exports = transporter









 