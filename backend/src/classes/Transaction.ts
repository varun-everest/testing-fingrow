import BudgetModel from "../collections/budget.collection"
import SavingGoalsModel from "../collections/savingsgoals.collection"
import UserModel from "../collections/user.collection"

class Transaction {
    amount : number
    txnCategory : string     //budget || savinggoal
    name : string
    date : Date 
    description : string

    constructor(amount: number, txnCategory : string, name : string , description : string, date? : Date) {
        this.amount = amount
        this.txnCategory = txnCategory
        this.name = name
        this.description = description
        this.date = date || new Date()
    }

    doTransaction = async(username : string) => {
        const user = await UserModel.findOne({username: username});
        if(!user){
            console.log("User does not exists");
            return false;
        }
        if(this.txnCategory === 'budget') {
            const budget = await BudgetModel.findOne({userId: user._id});
            if(!budget) {
                console.log('No Budgets associated with user');
                return false;
            }
            const budgetExist = budget.budgets.find(b => b.category === this.name);
            if(!budgetExist) {
                console.log('Budget does not exists');
                return false;
            }
            if(budgetExist.allotedAmount) {
                if(this.amount + budgetExist.spentAmount > budgetExist.allotedAmount) {
                    console.log("Limit exceeds");
                    return false;
                }
                budgetExist.spentAmount += this.amount
                await budget.save();
                console.log('Transaction success!!');
                return true;
            }
            
        } 
        else if(this.txnCategory === 'savinggoal') {
            const savinggoal = await SavingGoalsModel.findOne({userId: user._id});
            if(!savinggoal) {
                console.log("No Saving Goals associated with user");
                return false;
            }
            const gaolExist = savinggoal.goals.find(g => g.title === this.name);
            if(!gaolExist) {
                console.log('Saving Goal does not exists');
                return false;
            }
            if(gaolExist.targetAmount) {
                if(this.amount + gaolExist.currentAmount > gaolExist.targetAmount) {
                    console.log("You are saving more thant the target amount");
                    return false;
                }
                gaolExist.currentAmount += this.amount;
                await savinggoal.save();
                console.log("Transaction success");
                return true;
            }
        }
    }
}

export default Transaction; 