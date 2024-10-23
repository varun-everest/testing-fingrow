import SavingGoalsModel from "../collections/savingsgoals.collection"
import UserModel from "../collections/user.collection"

class SavingsGoal {
    title : string
    targetAmount : number
    currentAmount : number

    constructor(title: string, targetAmount: number, currentAmount? : number) {
        this.title = title
        this.targetAmount = targetAmount
        this.currentAmount = currentAmount ? currentAmount : 0
    }

    addGoal = async(username: string) => {
        const user = await UserModel.findOne({username: username});
        if(!user) {
            return 'User Not found';
        }
        
        const userGoals = await SavingGoalsModel.findOne({userId: user._id});
        if(!userGoals) {
            const userNewGoal = await SavingGoalsModel.create({
                userId: user._id,
                goals: []
            });
            userNewGoal.goals.push({
                title: this.title,
                targetAmount: this.targetAmount,
            });

            await userNewGoal.save();
            return "Successfully added";
        }
        const isGoalExist = userGoals.goals.find((b) => b.title === this.title);
        if(!isGoalExist) {
            userGoals.goals.push({
                title: this.title,
                targetAmount: this.targetAmount,
            });
            await userGoals.save();
            return 'Successfully added';
        }
        return 'Saving Goal already exists';
    }

    progress = async(userId: string, amount: number) => {

        const userGoals = await SavingGoalsModel.findOne({userId : userId});
        const goal = userGoals?.goals.find((g) => g.title === this.title);

        if(goal) {
            if(amount + this.currentAmount > this.targetAmount) {
                return 'Exceeding the amount';
            }
            goal.currentAmount += amount;
            if(goal.currentAmount >= 0.90*this.targetAmount) {
                console.log('You have completed 90% of your savings');
            }

            await userGoals?.save();
            return 'Success';
        }
    }
}

export default SavingsGoal;