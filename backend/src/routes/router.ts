import express from 'express';
import userRouter from './userRouter';
import budgetRouter from './budgetRouter';
import savingGoalsRouter from './savingGoalsRouter';
import transactionRouter from './transactionRouter';
import authRouter from './authenticationRouter';

const router = express.Router();

router.use('/', userRouter);
router.use('/', budgetRouter);
router.use('/', savingGoalsRouter);
router.use('/', transactionRouter);
router.use('/', authRouter);

export default router;