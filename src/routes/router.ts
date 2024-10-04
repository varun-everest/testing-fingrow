import express from 'express';
import userRouter from './userRouter';
import budgetRouter from './budgetRouter';
import savingGoalsRouter from './savingGoalsRouter';
import transactionRouter from './transactionRouter';

const router = express.Router();

router.use('/', userRouter);
router.use('/', budgetRouter);
router.use('/', savingGoalsRouter);
router.use('/', transactionRouter);

export default router;