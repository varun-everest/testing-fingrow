import express, { Request, Response } from 'express'
import BudgetModel from '../collections/budget.collection';
import Budget from '../services/Budget';
import UserModel from '../collections/user.collection';

const budgetRouter = express.Router();
budgetRouter.use(express.json());

budgetRouter.get('/budgets', async(req: Request, res: Response) => {
    const budgets = await BudgetModel.find();
    res.status(200).send(budgets);
});

budgetRouter.get('/:username/budgets', async(req: Request, res: Response) => {
    const {username} = req.params;
    const user = await UserModel.findOne({username: username});
    if(!user) {
        res.status(404).send("User Not Found");
        return ;
    }
    
    const userBudgets = await BudgetModel.findOne({userId: user._id});
    if(!userBudgets) {
        res.status(400).send('No Budgets Found');
        return ;
    }
    res.status(200).send(userBudgets.budgets);
});

budgetRouter.get('/:username/:budgetName/budgets', async(req: Request, res: Response) => {
    const {username, budgetName} = req.params;
    const user = await UserModel.findOne({username: username});
    if(!user) {
        res.status(404).send("User Not Found");
        return ;
    }
    
    const userBudgets = await BudgetModel.findOne({userId: user._id});
    if(!userBudgets) {
        res.status(400).send('No Budgets Found');
        return ;
    }
    const findBudget = userBudgets.budgets.find((g) => g.category === budgetName);
    if(!findBudget) {
        res.status(400).send(`${budgetName} does not exists`);
        return ;
    }
    res.status(200).send(findBudget);
});

budgetRouter.post('/:username/budgets', async(req: Request, res: Response) => {
    const {username} = req.params;
    const budget = new Budget(req.body.category, req.body.allotedAmount);

    const setBudgetStatus = await budget.setBudget(username);

    if(setBudgetStatus==="User Not found") {
        res.status(404).send("User does not exists");
        return;
    }
    else if(setBudgetStatus === 'Insufficient Balance') {
        res.status(400).send("Cannot add budget, You do not have sufficient balance");
        return ;
    }
    else if(setBudgetStatus==='Budget already exists') {
        res.status(409).send('Budget already exists');
        return ;
    }
    else if(setBudgetStatus==='Successfully added') {
        res.status(201).send(`Successfully added ${req.body.category} budget`);
        return ;
    }
    res.status(500).send("An error occurred");
});

export default budgetRouter;