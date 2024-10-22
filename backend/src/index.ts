import express from 'express';
import startDatabase from './database/connection';
import UserModel from './collections/user.collection';
import TransactionModel from './collections/transactions.collection';
import BudgetModel from './collections/budget.collection';
import SavingGoalsModel from './collections/savingsgoals.collection';
import router from './routes/router';
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
}

initializeDatabase();

app.use('/fingrow', router);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
