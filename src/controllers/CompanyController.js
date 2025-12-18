import Company from "../models/Company.js";


export const createCompany = async (req, res) => {
  try {
    const { name, address, industry } = req.body;

    if (!name || !address || !industry) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCompany = new Company({ name, address, industry });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  } 

};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
    } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateCompany = async (req, res) => {  
    try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body, 
        { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }   
    res.status(200).json(company);
  }
    catch (error) { 
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteCompany = async (req, res) => {  
    try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  }
    catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};