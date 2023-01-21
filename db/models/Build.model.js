const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({
    projectName: {},
    proType: {
        type: String,
        enum: ["buy", "show"]
    },
    building: [
        {
            build: [{
                num: {
                    type: Number

                },
                floors: [
                    {
                        floornumber: { type: Number, unique: true },
                        units: [
                            {

                                price: {
                                    type: Number,
                                    required: true
                                },
                                status: { type: String, default: false },

                                unitnumber: { type: Number },
                                client:
                                    [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
                                transactions:
                                    [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
                            }
                        ]
                    },////f number



                ]

                ,
                area: {
                    type: String

                },

            }]
        }
    ]



}, { timestamps: true })
const Build = mongoose.model("Build", projectSchema)

module.exports = Build