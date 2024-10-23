import { currentUser } from "../data/data"
import { TGoal } from "../types/types";

export const goalProgress = (title: string) => {
    const findGoal = currentUser.savingGoals.find(goal => goal.title === title);
    if (findGoal) {
        const filledPercentage = (findGoal.savedAmount / findGoal.targetAmount) * 100;
        if(filledPercentage >= 90.00) {
            console.log("You have saved more than 90.00% for this saving goal!!");
        }
        return `Hurray!!! you saved ${findGoal.savedAmount} of ${findGoal.targetAmount} which is ${filledPercentage.toFixed(2)}%`;
    }
    return 'SavingsGoal not exists';
}


export const addSavingsGoal = (title: string, targetAmount: number, savedAmount: number) => {
    const findSavingsGoal = currentUser.savingGoals.find(goal => goal.title === title);
    if(findSavingsGoal) {
        return 'Already exists';
    }
    const newGoal: TGoal = {
        title: title,
        targetAmount: targetAmount,
        savedAmount: savedAmount
    }
    currentUser.savingGoals.push(newGoal);
    return 'New Savings Goal added successfully';
};