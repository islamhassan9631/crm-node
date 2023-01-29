const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({
    projectName: {},
    proType: {
        type: String,
        enum: ["buy", "show"]
    },
    building: {
        type:[
            {
                build:{
                    type: [{
                        num: {
                            type: Number,
                            default:0
        
                        },
                        floors: {
                            type:[
                                {
                                     floornumber :{ type: Number ,default:0},
                                     units :{
                                        type:[
                                            {
                
                                                price: {
                                                    type: Number,
                                                    required: true
                                                },
                                                status: {
                                                    type: String,
                                                    
                                                    default:"available"
                                                },
                                                images:[],
                
                                                unitnumber: { type: Number },
                                                client:
                                                    [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
                                                transactions:
                                                    [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
                                            }
                                        ],
                                        default:[]
                                     }
                                 },
             
             
             
                             ],
                            default:[]
                        }
        
                        ,
                        area: {
                            type: String
        
                        },
        
                    }],
                    default:[]
                }
            }
        ],
        default:[]
    },
    dec:{
        type: String
    }



}, { timestamps: true })
const Build = mongoose.model("Build", projectSchema)

module.exports = Build