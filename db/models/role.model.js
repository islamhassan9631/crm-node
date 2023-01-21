const mongoose = require("mongoose")
const roleschema = mongoose.Schema( {
    title:{
        type:String,
        required:true,
        unique:true,

        trim:true
    }
    

})
const role = mongoose.model("role", roleschema  
    )
module.exports=role