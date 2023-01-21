const mongoose = require("mongoose")
const urlschema = mongoose.Schema( {
link:{
    type:String,
    required:true,
    unique:true,
},
methods:[{type:String}],
querys:[{type:String}],
params:[{type:String}],
roles:[{type:String}]
})
const Url = mongoose.model("Url", urlschema  
    )
module.exports=Url