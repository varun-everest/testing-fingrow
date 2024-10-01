import { currentUser } from "../data/data"
import { TReport } from "../types/types";


export const generateReport = () => {
    let totalIncome = currentUser.salary + currentUser.salary;
    let totalExpenses = currentUser.expenses.reduce((total, expense) => expense.usedAmount+total, 0);
    let budgetSummary : string[] = [];
    let savingGoalsProgress : string[] = [];

    for(let budget of currentUser.expenses) {
        budgetSummary.push(`${budget.category} ---> ${budget.usedAmount} of ${budget.allotedAmount}`);
    }
    
    for(let goal of currentUser.savingGoals) {
        savingGoalsProgress.push(`${goal.title} --> ${goal.savedAmount} saved out of ${goal.targetAmount}`);
    }

    const newReport: TReport = {
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        budgetSummary: budgetSummary,
        savingGoalsProgress: savingGoalsProgress
    }
    console.log(newReport);
    return true;
}