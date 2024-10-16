import express, { Request, Response } from 'express'
import SavingGoalsModel from '../collections/savingsgoals.collection';

const savingGoalsRouter = express.Router();
savingGoalsRouter.use(express.json());

savingGoalsRouter.get('/savingGoals', async(req: Request, res: Response) => {
    const goals = await SavingGoalsModel.find();
    res.status(200).send(goals);
});


export default savingGoalsRouter;