import express, { Request, Response } from 'express';
import TransactionModel from '../collections/transactions.collection';
import Transaction from '../services/Transaction';
import UserModel from '../collections/user.collection';
import { readCsvFile } from '../ImportData/importTransactions';

const transactionRouter = express.Router();
transactionRouter.use(express.json());

transactionRouter.get('/transactions', async(req: Request, res: Response) => {
    const transactions = await TransactionModel.find();
    res.status(200).send(transactions);
});

transactionRouter.get('/:username/transactions', async(req: Request, res: Response) => {

    const user = await UserModel.findOne({username: req.params.username});
    if(!user) {
        res.status(404).send("User does not exists");
        return ;
    }
    const userTransactions = await TransactionModel.findOne({userId: user._id});
    if(!userTransactions) {
        res.status(400).send('No Transactions Found');
        return ;
    }
    res.status(200).send(userTransactions.transactions);
});

transactionRouter.get('/:username/transactions/recent', async(req: Request, res: Response) => {
    const user = await UserModel.findOne({username: req.params.username});
    if(!user) {
        res.status(404).send("User not found");
        return ;
    }

    const userTransactions = await TransactionModel.findOne({userId: user._id});
    if(!userTransactions) {
        res.status(400).send("No Transactions found");
        return ;
    }
    const recentTxns = userTransactions.transactions.slice(-5).reverse();
    res.status(200).send(recentTxns);

});

transactionRouter.post('/:username/transactions', async(req: Request, res: Response) => {
    const {username} = req.params;
    const {txnCategory, amount, name, description, date} = req.body;

    const txn = new Transaction(amount, txnCategory, name, description, date);
    const txnStatus = await txn.addTransaction(username);

    if(txnStatus === 'User Not Found') {
        res.status(404).send("User does not exists");
    }
    else if(txnStatus === 'Insufficient balance') {
        res.status(400).send('Insufficent balance in your account');
    }
    else if(txnStatus === 'Empty Budgets') {
        res.status(400).send(`No Budgets associated with ${username}`);
    }
    else if(txnStatus === 'Empty Saving Goals') {
        res.status(400).send(`No Saving Goals associated with ${username}`);
    }
    else if(txnStatus === 'Budget Not Found' || txnStatus==='Saving Goal Not Found') {
        res.status(400).send(`${name} Not found`);
    }
    else if(txnStatus === 'Exceeds') {
        if(txnCategory === 'budget') {
            res.status(400).send("Exceeding the amount");
        } else if(txnCategory === 'savinggoal') {
            res.status(400).send('You have saving more than the target amount');
        }
    }
    else if(txnStatus === 'Success'){
        res.status(200).send("Successfully done transaction");
    }
    return ;
});

transactionRouter.post('/transactions', async(req: Request, res: Response) => {
    await readCsvFile();
    res.status(200).send('Successfully imported transactions');
    return ;
});

export default transactionRouter;