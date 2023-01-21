const mongoose = require("mongoose")

const build=require("../models/Build.model")
const transactionSchema = mongoose.Schema( {
    unit : {type: mongoose.Schema.Types.ObjectId, ref: "build"},
       
	client: {type: mongoose.Schema.Types.ObjectId, ref: "client"},
	deposited_by_user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	transaction_info:Object
},{ timestamps: true })
const Transactio=mongoose.model("Transaction",transactionSchema)
module.exports=Transactio





// 63a94970ec51dc45c8f96bf9
// 63c9cf39524ff93e359dbd44