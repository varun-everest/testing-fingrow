import express, { Request, Response } from 'express'
import UserModel from '../collections/user.collection';
import Report from '../services/Report';

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/users', async(req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).send(users);
});

userRouter.post('/:username/reports', async(req: Request, res: Response) => {

    const {reportType, startDate, endDate} = req.body;

    const report = new Report(reportType, startDate, endDate);
    const reportStatus = await report.generateReport(req.params.username);

    if(reportStatus === 'User not found') {
        res.status(404).send("User Not Found");
    }
    else if(reportStatus === 'No Transactions Found') {
        res.status(400).send('No Transactions');
    }
    else if(reportStatus) {
        res.status(200).send(reportStatus);
    }
});

export default userRouter;