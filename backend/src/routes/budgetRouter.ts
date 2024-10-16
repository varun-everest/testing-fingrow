import express, { Request, Response } from 'express'
import BudgetModel from '../collections/budget.collection';

const budgetRouter = express.Router();
budgetRouter.use(express.json());

budgetRouter.get('/budgets', async(req: Request, res: Response) => {
    const budgets = await BudgetModel.find();
    res.status(200).send(budgets);
});

export default budgetRouter;