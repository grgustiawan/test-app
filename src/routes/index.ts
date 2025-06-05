import { Router } from 'express';
import transactionRoutes from './transaction';

const router = Router();

router.get("/", (req, res) => {
  res.send("Success Test App");
});

router.use('/transaction', transactionRoutes);

export default router;