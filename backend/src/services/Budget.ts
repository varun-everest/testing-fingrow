import BudgetModel from "../collections/budget.collection"
import UserModel from "../collections/user.collection"

class Budget {
    category : string
    allotedAmount : number
    spentAmount : number

    constructor(category: string, allotedAmount: number, spentAmount? : number) {
        this.category = category
        this.allotedAmount = allotedAmount
        this.spentAmount = spentAmount ? spentAmount : 0
    }

    setBudget = async(username: string) => {
        const user = await UserModel.findOne({username: username});
        if(!user) {
            return 'User Not found';
        }
        if(user.amountUsed + this.allotedAmount > user.totalIncome) {
            return 'Insufficient Balance';
        }
        
        const userBudgets = await BudgetModel.findOne({userId: user._id});
        if(!userBudgets) {
            user.amountUsed += this.allotedAmount;
            const userNewBudget = await BudgetModel.create({
                userId: user._id,
                budgets: []
            });
            userNewBudget.budgets.push({
                category: this.category,
                allotedAmount: this.allotedAmount,
            });

            await user.save();
            await userNewBudget.save();
            return "Successfully added";
        }
        const isBudgetExist = userBudgets.budgets.find((b) => b.category === this.category);
        if(!isBudgetExist) {
            user.amountUsed += this.allotedAmount;
            userBudgets.budgets.push({
                category: this.category,
                allotedAmount: this.allotedAmount,
            });

            await user.save();
            await userBudgets.save();
            return 'Successfully added';
        }
        return 'Budget already exists';
    }

    update = async(userId: string, amount: number) => {
        const userBudgets = await BudgetModel.findOne({userId : userId});
        const budget = userBudgets?.budgets.find((b) => b.category === this.category);
        if(budget) {
            if(amount + this.spentAmount > this.allotedAmount) {
                return 'Exceeding the amount';
            }
            budget.spentAmount += amount;

            await userBudgets?.save();
            return 'Success'
        }
    }
}

export default Budget;