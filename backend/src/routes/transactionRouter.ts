import express, { Request, Response } from 'express';
import TransactionModel from '../collections/transactions.collection';

const transactionRouter = express.Router();
transactionRouter.use(express.json());

transactionRouter.get('/transactions', async(req: Request, res: Response) => {
    const transactions = await TransactionModel.find();
    res.status(200).send(transactions);
});



export default transactionRouter;