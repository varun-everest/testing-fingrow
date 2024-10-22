import mongoose from 'mongoose';
import BudgetModel from '../collections/budget.collection'; 

beforeAll(async () => {
    const mongoDbURI = 'mongodb://127.0.0.1/fingrow_testDB'; 
    await mongoose.connect(mongoDbURI);
});

afterAll(async () => {
    await BudgetModel.deleteMany({});
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close();
});

describe('Tests related to the Budget Model Collection', () => {

    beforeEach(async () => {
        await BudgetModel.deleteMany({});
    });

    test('should default spentAmount to 0 if not given', async () => {
        const budgetData = {
            userId: new mongoose.Types.ObjectId(),
            budgets: [
                {
                    category: 'Groceries',
                    allotedAmount: 5000,
                },
            ],
        };

        const budget = await BudgetModel.create(budgetData);

        expect(budget).toBeDefined();
        expect(budget.budgets[0].spentAmount).toBe(0); 
    });

    test('should create a budget successfully with the given valid data', async () => {
        const budgetData = {
            userId: new mongoose.Types.ObjectId(), 
            budgets: [
                {
                    category: 'Groceries',
                    allotedAmount: 5000,
                    spentAmount: 2000,
                },
                {
                    category: 'Entertainment',
                    allotedAmount: 3000,
                }
            ],
        };

        const budget = await BudgetModel.create(budgetData);

        expect(budget).toBeDefined(); 
        expect(budget.userId).toEqual(budgetData.userId); 
        expect(budget.budgets).toHaveLength(2); 
        expect(budget.budgets[0].category).toBe(budgetData.budgets[0].category); 
        expect(budget.budgets[0].allotedAmount).toBe(budgetData.budgets[0].allotedAmount); 
        expect(budget.budgets[0].spentAmount).toBe(budgetData.budgets[0].spentAmount);
        expect(budget.budgets[1].category).toBe(budgetData.budgets[1].category); 
        expect(budget.budgets[1].allotedAmount).toBe(budgetData.budgets[1].allotedAmount);
        expect(budget.budgets[1].spentAmount).toBe(0);
    });
});
