import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
    
    
    companyName: {
        type: String,
        required: true,
        unique: true,  
    },
    order:{
        type: Number,
        default: 0,

    },
    isActive: {
        type: Boolean,
        default: true,
    }, 
},
    {
    timestamps: true,
    collection : 'companys',
    },




);

const Company = mongoose.model("Company", companySchema);

export default Company;