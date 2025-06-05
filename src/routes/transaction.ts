import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';

const router = Router();

router.get('/generate', TransactionController.generateTransaction);

export default router;