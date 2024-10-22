import BudgetModel from "../collections/budget.collection"
import SavingGoalsModel from "../collections/savingsgoals.collection"
import TransactionModel from "../collections/transactions.collection"
import UserModel from "../collections/user.collection"
import Budget from "./Budget"
import SavingsGoal from "./SavingsGoal"

class Transaction {
    amount : number
    txnCategory : string 
    name : string
    date : Date 
    description : string

    constructor(amount: number, txnCategory : string, name : string , description : string, date? : Date) {
        this.amount = amount
        this.txnCategory = txnCategory
        this.name = name
        this.description = description
        this.date = date ? date : new Date() 
    }

    addTransaction = async(username: string) => {

        const user = await UserModel.findOne({username: username});
        if(!user) {
            return 'User Not Found';
        }

        if(user.amountUsed + this.amount > user.totalIncome) {
            return 'Insufficient balance';
        }

        const userTransactions = await TransactionModel.findOne({userId: user._id});

        const newTxn = {
            amount : this.amount,
            txnCategory: this.txnCategory,
            name: this.name,
            date : this.date,
            description:this.description
        };

        if(this.txnCategory === 'budget') {

            const userBudgets = await BudgetModel.findOne({userId: user._id});
            if(!userBudgets) {
                return 'Empty Budgets';
            }
            const isBudgetExist = userBudgets.budgets.find((b) => b.category === this.name);
            if(!isBudgetExist) {
                return 'Budget Not Found';
            }

            const budget = new Budget(isBudgetExist.category!, isBudgetExist.allotedAmount!, isBudgetExist.spentAmount!);
            const txn = await budget.update(String(user._id), this.amount);
            if(txn === 'Exceeding the amount') {
                return 'Exceeds';
            }
            else if(txn === 'Success') {
                if(!userTransactions) {
                    const txns = await TransactionModel.create({
                        userId: user._id,
                        transactions: []
                    });
                    txns.transactions.push(newTxn);
                    await txns.save();
                } else {
                    userTransactions.transactions.push(newTxn);
                    await userTransactions.save();
                }
                user.amountUsed += this.amount;
                await user.save();
                return 'Success';
            }
        }
        else if(this.txnCategory === 'savinggoal') {

            const userGoals = await SavingGoalsModel.findOne({userId: user._id});
            if(!userGoals) {
                return 'Empty Saving Goals';
            }
            const isGoalExist = userGoals.goals.find((g) => g.title === this.name);
            if(!isGoalExist) {
                return 'Saving Goal Not Found';
            }

            const goal = new SavingsGoal(isGoalExist.title!, isGoalExist.targetAmount!, isGoalExist.currentAmount!);
            const txn = await goal.progress(String(user._id), this.amount);

            if(txn === 'Exceeding the amount') {
                return 'Exceeds'; 
            }
            if(txn === 'Success') {
                if(!userTransactions) {
                    const txns = await TransactionModel.create({
                        userId: user._id,
                        transactions: []
                    });
                    txns.transactions.push(newTxn);
                    await txns.save();
                } else {
                    userTransactions.transactions.push(newTxn);
                    await userTransactions.save();
                }
                user.amountUsed += this.amount;
                await user.save();
                return 'Success';
            }
        }
        else if(this.txnCategory === 'other') {
            user.totalIncome += this.amount;
            if(!userTransactions) {
                const txns = await TransactionModel.create({
                    userId: user._id,
                    transactions: []
                });
                txns.transactions.push(newTxn);
                await txns.save();
            } else {
                userTransactions.transactions.push(newTxn);
                await userTransactions.save();
            }
            await user.save();
            return 'Success';
        }
    }
}

export default Transaction;