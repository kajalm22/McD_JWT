const mongoose = require ("mongoose")

const orderSchema =  new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    order : {
        type : String,
        required : [true, "Please add a text value"], 
    }
},

{
        timestamps : true, 
})

module.exports = mongoose.model("Order",orderSchema)