import express from 'express';
import startDatabase from './database/connection';
import UserModel from './collections/user.collection';
import TransactionModel from './collections/transactions.collection';
import BudgetModel from './collections/budget.collection';
import SavingGoalsModel from './collections/savingsgoals.collection';
import router from './routes/router';


const PORT = 4000;
const app = express();

const initializeDatabase = async() => {
    await startDatabase();
    UserModel
    TransactionModel
    BudgetModel;
    SavingGoalsModel;
}

initializeDatabase();

app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is running at http:localhost:${PORT}/`);
});