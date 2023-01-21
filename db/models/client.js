const mongoose = require("mongoose")
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User= require("./user.model")
const Clinetschema = mongoose.Schema( {
    fName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength:20,
        required:true
    }, 
    lName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength:20,
        required:true
    }, 
   
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
    nationalId:{
type:Number,
required:true,
minLength: 14,
maxLength:14,
    },
    
    password:{
        type:String, 
        trim:true,
        minLength: 6,
        required:true,

    }, 
    gender:{
        type:String, 
        trim:true,
        lowercase:true,
        enum: ["male", "female"]
    }, 
    created_by: {type:mongoose.Schema.Types.ObjectId,required: true ,ref: "User"},
    unit: [{ type:Object}],/*unit:[   {
        "price" : 7788,
        "status" : "false",
        "unitnumber" : 8,
        "client" : [],
        "transactions" : [],
        "_id" : ObjectId("63bb30b43f737eb5a7e16456")
    }]*/
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref: "Transaction"}],
    
    phoneNum:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
        }
    },
    roles:{
        type:String,
        trim:true,
        lowercase:true,
    },
    

         tokens:[
            {token:{type:String,
                }
                }
         ],
         
},{timestamps:true} )
   
Clinetschema.pre("save", async function(){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,8)
    }

    
})
Clinetschema.statics.login=async(email,password)=>{
    const  clinet=await Clinet.findOne({email})
    if(!clinet) throw new Error("error")
    const vilpas=await bcryptjs.compare(password,clinet.password)
    if(!vilpas) throw new Error("error")
    return clinet
}

Clinetschema.methods.toJSON=function(){
    const data=this.toObject()
    delete data.password
    delete data.tokens
    return data
}
Clinetschema.methods.genratToken= async function(){
    const clinet=this
    const token=jwt.sign({_id:clinet._id},"node")
    clinet.tokens=clinet.tokens.concat({token})
    await clinet.save()
    return token

}
Clinetschema.virtual("myunit", {
    ref:"unit",    localField:"_id",
     foreignField:"client"
 })
 Clinetschema.virtual("client", {
    ref:"Transaction",    localField:"_id",
     foreignField:"client"
 })
 


const Clinet=mongoose.model("Clinet",Clinetschema)
module.exports=Clinet