import BudgetModel from "../collections/budget.collection";
import SavingGoalsModel from "../collections/savingsgoals.collection";
import TransactionModel from "../collections/transactions.collection";
import UserModel from "../collections/user.collection";
import Budget from "./Budget";
import SavingGoal from "./SavingGoal";
import Transaction from "./Transaction";

class User{
    username : string
    password : string
    totalIncome: number
    amountUsed : number
    budgets : Budget[]
    goals : SavingGoal[]
    transactions : Transaction[]

    constructor(username: string, password: string, totalIncome: number) {
        this.username = username;
        this.password = password;
        this.totalIncome = totalIncome;
        this.amountUsed =  0;
        this.budgets = [];
        this.goals = [];
        this.transactions = [];
    }

    registerUser = async() => {
        try{
            const findUser = await UserModel.findOne({username: this.username});
            if(findUser) {
                console.log('UserName already exists');
                return ;
            }
            const user = await UserModel.create({
                username: this.username,
                password: this.password,
                totalIncome: this.totalIncome
            });
            await user.save();
            console.log('Successfully registered user');
            return ;
        } catch(err) {
            console.log("Error Occurred : ", err);
        }
    }

    addBudget = async(category: string, allotedAmount: number) => {
        let newBudget = new Budget(category, allotedAmount);
        
        const user = await UserModel.findOne({username: this.username});
        if(!user){
            console.log("User does not exists");
            return;
        }
        if(user.amountUsed + allotedAmount > user.totalIncome) {
            console.log("Cannot add Budget!.. You don't have sufficent balance");
            return ;
        }

        const userBudgets = await BudgetModel.findOne({userId: user._id});
        if(!userBudgets) {
            user.amountUsed += allotedAmount;
            const userNewBudget = await BudgetModel.create({
                userId: user._id,
                budgets: []
            });
            userNewBudget.budgets.push({
                category: newBudget.category,
                allotedAmount: newBudget.allotedAmount,
            });
            await user.save();
            await userNewBudget.save();
            this.amountUsed += allotedAmount
            this.budgets.push(newBudget);
            console.log("Successfully added New Budget");
            return ;
        }
        const budgetExisted = userBudgets.budgets.find((b) => b.category === newBudget.category);
        if(!budgetExisted) {
            user.amountUsed += allotedAmount;
            userBudgets.budgets.push({
                category: newBudget.category,
                allotedAmount: newBudget.allotedAmount,
            });
            await user.save();
            await userBudgets.save();

            this.amountUsed += allotedAmount
            this.budgets.push(newBudget);
            console.log("Successfully added New Budget");
            return ;
        }
        console.log("Budget already exists. Cannot be added");
        return ;
    }

    updateBudget = async(category: string, newAllotedAmount: number) => {
        const user = await UserModel.findOne({username: this.username});
        if(!user) {
            console.log("User does not exists");
            return ;
        }
        const userBudgets = await BudgetModel.findOne({userId: user._id});
        if(!userBudgets) {
            console.log('No budget exists');
            return ;
        }
        const findBudget = userBudgets.budgets.find(b => b.category === category);
        if(findBudget) {
            if(findBudget.spentAmount > newAllotedAmount) {
                console.log("Unable to update the budget. Already spent amount exceeds the new allotting amount");
                return ;
            }

            findBudget.allotedAmount = newAllotedAmount;
            await findBudget.save();
            
            const budget = this.budgets.find(b => b.category === findBudget.category);
            if(budget) {
                budget.updateBudget(newAllotedAmount);
            }
            console.log('Successfully updated the Budget!!!');
        } else {
            console.log("Given Budget does not exists");
            return;
        }
    }

    checkBudgetSpent = async (category: string) => {
        const user = await UserModel.findOne({ username: this.username });
        if (!user) {
            console.log("User does not exists");
            return;
        }

        const userBudgets = await BudgetModel.findOne({ userId: user._id });
        if (!userBudgets) {
            console.log("No budgets exist for this user");
            return;
        }

        const budget = userBudgets.budgets.find(b => b.category === category);
        if (budget) {
            console.log(`For Category ${budget.category} You have Allotted Amount is ${budget.allotedAmount} and Spent Amount is ${budget.spentAmount}`);
            return ;
        } else {
            console.log(`No budget found for category: ${category}`);
            return ;
        }
    }

    addGoal = async(title: string, targetAmount: number) => {
        let newGoal = new SavingGoal(title, targetAmount);
        
        const user = await UserModel.findOne({username: this.username});
        if(!user){
            console.log("User does not exists");
            return;
        }

        const userGoals = await SavingGoalsModel.findOne({userId: user._id});
        if(!userGoals) {
            const userNewGoal = await SavingGoalsModel.create({
                userId: user._id,
                goals: []
            });
            userNewGoal.goals.push({
                title: newGoal.title,
                targetAmount: newGoal.targetAmount,
            });
            await user.save();
            await userNewGoal.save();
            this.goals.push(newGoal);
            console.log('Successfully added new Goal');
            return ;
        }
        const goalExist = userGoals.goals.find((g) => g.title === newGoal.title);
        if(goalExist) {
            console.log("Goal already exists. Cannot be added");
            // return 'Heloo' ;
        }
        else {
            userGoals.goals.push({
                title: newGoal.title,
                targetAmount: newGoal.targetAmount,
            });
            await user.save();
            await userGoals.save();

            this.goals.push(newGoal);
            console.log('Successfully added new Goal');
            return ;
        }
    }

    checkGoalProgress = async (title: string) => {

        const user = await UserModel.findOne({ username: this.username });
        if (!user) {
            console.log("User does not exists");
            return;
        }

        const userGoals = await SavingGoalsModel.findOne({ userId: user._id });
        if (!userGoals) {
            console.log("No goals exists for this user");
            return;
        }

        const goal = userGoals.goals.find(g => g.title === title);
        if (goal && goal.targetAmount) {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            if(progress >= 90) {
                console.log(`Hurray you have saved ${progress.toFixed(2)}% of your savings`);
            }
            console.log(`Progress for Goal --> ${goal.title} : ${progress.toFixed(2)}`);
            return;
        } else {
            console.log(`No goal found with the title : ${title}`);
        }
    }

    makeTransaction = async(amount: number, txnCategory: string, name: string, description: string, date?: Date) => {
        const newTransaction = new Transaction(amount, txnCategory, name, description, date);
        const user = await UserModel.findOne({username: this.username});
        if(!user) {
            console.log('User does not exists');
            return ;
        }
       
        const isTxnSuccess = await newTransaction.doTransaction(this.username);

        if(isTxnSuccess) {
            
            const userTransactions = await TransactionModel.findOne({userId:user._id});
            if(!userTransactions) {

                if(txnCategory === 'budget') {
                    const findBudget = this.budgets.find(b => b.category === name);
                    if(findBudget) {
                        findBudget.spentAmount+=amount;
                    }
                } else if(txnCategory === 'savinggoal') {
                    const findGoal = this.goals.find(g => g.title === name);
                    if(findGoal) {
                        findGoal.currentAmount += amount;
                    }
                }
                
                const newTxn = await TransactionModel.create({
                    userId: user._id,
                    transactions: []
                });

                newTxn.transactions.push({
                    amount : newTransaction.amount,
                    txnCategory : newTransaction.txnCategory,
                    name : newTransaction.name,
                    date : newTransaction.date,
                    description : newTransaction.description
                });
                await newTxn.save();
                this.transactions.push(newTransaction);
                return ;
            }
            userTransactions.transactions.push({
                amount : newTransaction.amount,
                txnCategory : newTransaction.txnCategory,
                name : newTransaction.name,
                date : newTransaction.date,
                description : newTransaction.description
            });
            await userTransactions.save();
            this.transactions.push(newTransaction);
            console.log('Transacation completed');
        } else {
            console.log('Transaction failed');
        }
        return ;
    }

    generateReport = async(reportName: string, startDate: Date, endDate: Date) => {
        const user = await UserModel.findOne({ username: this.username });
        if (!user) {
            console.log("User does not exist");
            return;
        }

        const userTransactions = await TransactionModel.findOne({
            userId: user._id,
        });

        if(!userTransactions) {
            console.log("No transactions found");
            return ;
        }

        const filteredTransactions = userTransactions.transactions.filter(txn => {
            if(txn.date) {
                if(txn.date >= startDate && txn.date <= endDate) {
                    return txn;
                }
            }
        });

        if(filteredTransactions.length === 0) {
            console.log("No transactions are there between the period");
            return ;
        }
        
        if(reportName === 'total') {

            const totals = filteredTransactions.reduce((total, txn) => {
                if (txn.txnCategory === 'budget' && txn.amount) {
                    total.totalExpenses += txn.amount; 
                } else if (txn.txnCategory === 'savinggoal' && txn.amount) {
                    total.totalIncome += txn.amount; 
                }
                return total;
            }, { totalIncome: 0, totalExpenses: 0 }); 
    
            console.log(`Total Income: ${totals.totalIncome}`);
            console.log(`Total Expenses: ${totals.totalExpenses}`);

            return `
                Total Income: ${totals.totalIncome}
                Total Expenses: ${totals.totalExpenses}
            `
        }
        else if (reportName === 'budget') {
            const budgetTransactions = filteredTransactions.filter(txn => txn.txnCategory === 'budget');
            if(!budgetTransactions) {
                console.log("Empty budget summary");
                return ;
            }

            const userBudgets = await BudgetModel.findOne({ userId: user._id });
            if(!userBudgets) {
                console.log("No budgets found");
                return ;
            }

            const budgetSummary = userBudgets.budgets.map(budget => {
                return {
                    category : budget.category,
                    allottedAmount : budget.allotedAmount,
                    spentAmount :  budget.spentAmount,
                }
            });
            budgetSummary.forEach(b => {
                console.log(`Category: ${b.category}, Allotted: ${b.allottedAmount}, Spent: ${b.spentAmount}`);
            });
            return ;
    
        } else if (reportName === 'savinggoals') {
            const userGoals = await SavingGoalsModel.findOne({ userId: user._id });
            if(!userGoals){
                console.log("No goals found");
                return ;
            }

            const goalsProgress = userGoals.goals.map(goal => {
                return {
                    goalName : goal.title,
                    targetAmount : goal.targetAmount,
                    savedAmount : goal.currentAmount
                }
            });

            goalsProgress.forEach(g => {
                console.log(`Goal Name: ${g.goalName}, Target Amount: ${g.targetAmount}, Saved: ${g.savedAmount}`);
            });
            return ;
        }


    }
}

export default User;