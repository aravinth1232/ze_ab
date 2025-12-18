import express from 'express';
import { createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany

} from '../controllers/CompanyController.js';

const router = express.Router();

router.post('/companies', createCompany);
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.put('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

export default router;