import { currentUser } from "../data/data";
import { TBudget } from "../types/types";
import { transaction } from "./Transaction";

export const addCategory = (category: string, allotedAmount: number) => {
    const findCategory = currentUser.expenses.find(expense => expense.category === category);
    if(findCategory){
        return 'Category already exists';
    }
    if(allotedAmount > currentUser.otherIncome){
        return 'Cannot add Budget to the category';
    }
    const newExpense: TBudget = {
        category: category,
        allotedAmount: allotedAmount,
        usedAmount: 0,
    }
    transaction(allotedAmount, 'debit', `Alloted amount for ${category}`);
    return 'Successfully added category';
}