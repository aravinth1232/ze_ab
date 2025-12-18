import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  
},
    address: {
    type: String,
    required: true,
  },
    industry: { 
    type: String,
    required: true,
  },
  

},
        {
        timestamps: true,
        collection : 'companys',
        },




);

const Company = mongoose.model("Company", companySchema);

export default Company;