import express from 'express';
import startDatabase from './database/connection';
import UserModel from './collections/user.collection';
import TransactionModel from './collections/transactions.collection';
import BudgetModel from './collections/budget.collection';
import SavingGoalsModel from './collections/savingsgoals.collection';
import router from './routes/router';
import User from './classes/User';
import { readCsvFile } from './ImportData/importTransactions';
import cors from 'cors';


const PORT = 4000;
const app = express();
app.use(cors(
    {
      origin: 'http://localhost:3000', 
      methods: 'GET,POST,PUT,DELETE',   
      credentials: true,   
      allowedHeaders: ['Content-Type', 'Authorization']             
    }
  ))
  
const initializeDatabase = async() => {
    await startDatabase();
    // UserModel
    // TransactionModel
    // BudgetModel;
    // SavingGoalsModel;

    // const user = new User('arun','V@run765', 100000);
    // await user.registerUser();
    // readCsvFile('src/data/previoustransactions.csv')
}

initializeDatabase();

app.use('/fingrow', router);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
