import express, { Request, Response } from 'express'
import UserModel from '../collections/user.collection';
import User from '../services/User';

const authRouter = express.Router();
authRouter.use(express.json());

//Recieves username and password!!
authRouter.post('/login', async(req: Request, res: Response) => {
    
    const findUser = await UserModel.findOne({username: req.body.username});
    if(!findUser) {
        res.status(404).send('Username does not exists!!');
        return;
    }
    if(findUser.password !== req.body.password) {
        res.status(401).send('Incorrect Password');
        return;
    }
    res.status(200).send(findUser);
});

//It regiseters a new user with unique username...
authRouter.post('/register', async(req: Request, res: Response) => {
    try{
        const newUser = new User(req.body.username, req.body.password, req.body.totalIncome);
        const isRegisteredUser = await newUser.registerUser();
        if(!isRegisteredUser) {
            res.status(400).send('UserName already exists');
            return ;
        }
        res.status(201).send(newUser);
    } catch(err) {
        console.log("Error Occurred : ", err);
        res.status(400).send('BadRequest');
    }
});

export default authRouter;