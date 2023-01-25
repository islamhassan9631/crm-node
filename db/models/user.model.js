const mongoose = require("mongoose")
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Userschema = mongoose.Schema( {
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
    age:{
type:Number
    } ,
    image:{
        type:String, 
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
    
    
    phone:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
        }
    },
    roles:{
        type: String,
                trim:true,
                lowercase:true,
                required:true
    },methods:[{type:String}],
    

    

         tokens:[
            {token:{type:String,
                }
                }
         ],
         
},{timestamps:true} )
   
Userschema.pre("save", async function(){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,8)
    }

    
})
Userschema.statics.login=async(email,password)=>{
    const  user=await User.findOne({email})
    if(!user) throw new Error("error")
    const vilpas=await bcryptjs.compare(password,user.password)
    if(!vilpas) throw new Error("error")
    return user
}

Userschema.methods.toJSON=function(){
    const data=this.toObject()
    delete data.password
    delete data.tokens
    return data
}
Userschema.methods.genratToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id},"node")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

Userschema.virtual("created_by", {
    ref:"Clinet",
    localField:"_id",
    foreignField:"created_by"
})
Userschema.virtual("deposited_by_user", {
    ref:"Transaction",
    localField:"_id",
    foreignField:"deposited_by_user"
})



const User=mongoose.model("User",Userschema)
module.exports=User