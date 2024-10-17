import express, { Request, Response } from 'express'
import UserModel from '../collections/user.collection';

const authRouter = express.Router();
authRouter.use(express.json());

//Recieves username and password!!
authRouter.get('/login', async(req: Request, res: Response) => {
    
    const findUser = await UserModel.findOne({username: req.body.username});
    if(!findUser) {
        res.send('Username does not exists!!');
        return;
    }
    if(findUser.password !== req.body.password) {
        res.send('Incorrect Password');
        return;
    }
    res.send(`Login successful`);
});

//It regiseters a new user with unique username...
authRouter.post('/register', async(req: Request, res: Response) => {
    try{
        const findUser = await UserModel.findOne({username: req.body.username});
        if(findUser) {
            res.status(400).send('UserName already exists');
            return;
        }
        const user = await UserModel.create(req.body);
        await user.save();
        res.status(201).send(user);
    } catch(err) {
        console.log("Error Occurred : ", err);
        res.status(400).send('BadRequest');
    }
});

export default authRouter;