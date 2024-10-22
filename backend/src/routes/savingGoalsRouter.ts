import express, { Request, Response } from 'express'
import SavingGoalsModel from '../collections/savingsgoals.collection';
import SavingsGoal from '../services/SavingsGoal';
import UserModel from '../collections/user.collection';

const savingGoalsRouter = express.Router();
savingGoalsRouter.use(express.json());

savingGoalsRouter.get('/savingGoals', async(req: Request, res: Response) => {
    const goals = await SavingGoalsModel.find();
    res.status(200).send(goals);
});

savingGoalsRouter.get('/:username/savingGoals', async(req: Request, res: Response) => {
    const {username} = req.params;
    const user = await UserModel.findOne({username: username});
    if(!user) {
        res.status(404).send("User Not Found");
        return ;
    }
    
    const userGoals = await SavingGoalsModel.findOne({userId: user._id});
    if(!userGoals) {
        res.status(400).send('No Goals Found');
        return ;
    }
    res.status(200).send(userGoals.goals);
});

savingGoalsRouter.get('/:username/:goalName/savingGoals', async(req: Request, res: Response) => {
    const {username, goalName} = req.params;
    const user = await UserModel.findOne({username: username});
    if(!user) {
        res.status(404).send("User Not Found");
        return ;
    }
    
    const userGoals = await SavingGoalsModel.findOne({userId: user._id});
    if(!userGoals) {
        res.status(400).send('No Goals Found');
        return ;
    }
    const findGoal = userGoals.goals.find((g) => g.title === goalName);
    if(!findGoal) {
        res.status(400).send(`${goalName} does not exists`);
        return ;
    }
    res.status(200).send(findGoal);
});

savingGoalsRouter.post('/:username/savingGoals', async(req: Request, res: Response) => {
    const {username} = req.params;
    const goal = new SavingsGoal(req.body.title, req.body.targetAmount);

    const setGoalStatus = await goal.addGoal(username);

    if(setGoalStatus==="User Not found") {
        res.status(404).send("User does not exists");
        return;
    }
    else if(setGoalStatus==='Saving Goal already exists') {
        res.status(409).send('Saving goal already exists');
        return ;
    }
    else if(setGoalStatus==='Successfully added') {
        res.status(201).send(`Successfully added ${req.body.title} Savings Goal`);
        return ;
    }
    res.status(500).send("An error occurred");
});

export default savingGoalsRouter;