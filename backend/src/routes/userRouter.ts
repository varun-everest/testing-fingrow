import express, { Request, Response } from 'express'
import UserModel from '../collections/user.collection';

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/users', async(req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).send(users);
});


export default userRouter;