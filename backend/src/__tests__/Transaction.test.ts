import Transaction from '../services/Transaction'; // Adjust the path accordingly
import UserModel from '../collections/user.collection';
import BudgetModel from '../collections/budget.collection';
import SavingGoalsModel from '../collections/savingsgoals.collection';
import TransactionModel from '../collections/transactions.collection';
import Budget from '../services/Budget';
import SavingsGoal from '../services/SavingsGoal';

import * as BB from '../services/Budget';


jest.mock('../collections/user.collection', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../collections/budget.collection', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../collections/savingsgoals.collection', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../collections/transactions.collection', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../services/Budget', () => jest.fn().mockImplementation(() => ({
    update: jest.fn(),
})));

jest.mock('../services/SavingsGoal', () => jest.fn().mockImplementation(() => ({
    progress: jest.fn(),
})));

describe('Tests related to Transaction service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
       
    });

    describe('Tests related to addTransaction method in Transaction services', () => {

        test('should return User Not Found if the user does not exist', async () => {
            
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            const transaction = new Transaction(1000, 'budget', 'Groceries', 'Vegetables');
            const result = await transaction.addTransaction('Virat');

            expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Virat' });
            expect(result).toBe('User Not Found');
        });

        test('should return Insufficient balance if the transaction exceeds users income', async () => {
            
            const mockedUser = { 
                _id: '6303522765', 
                username:'Virat',
                totalIncome: 50000, 
                amountUsed: 45000 
            };
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);

            const transaction = new Transaction(6000, 'budget', 'Medical', 'Migraine Appointment');
            const result = await transaction.addTransaction('Virat');

            expect(result).toBe('Insufficient balance');
        });

        describe('Tests related to the budget transactions', () => {

            test('should return Empty Budgets if no budgets exist for the user', async () => {
                
                const mockedUser = { 
                    _id: '6303522765', 
                    username: 'Varun',
                    totalIncome: 10000, 
                    amountUsed: 4000 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (BudgetModel.findOne as jest.Mock).mockResolvedValue(null);

                const transaction = new Transaction(1000, 'budget', 'Groceries', 'Veggies');
                const result = await transaction.addTransaction('Varun');

                expect(result).toBe('Empty Budgets');
            });

            test('should return Budget Not Found if the budget does not exist', async () => {
                
                const mockedUser = { 
                    _id: '6303522765',
                    username: 'Varun', 
                    totalIncome: 10000, 
                    amountUsed: 5000 
                };

                const mockedBudgets = { 
                    userId: '6303522765',
                    budgets: [{ category: 'Entertainment', allotedAmount: 3000, spentAmount: 2000 }] 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockedBudgets);

                const transaction = new Transaction(1000, 'budget', 'Medical', 'Doctor Appointment');
                const result = await transaction.addTransaction('Varun');

                expect(result).toBe('Budget Not Found');
            });

            test('should return Exceeds if the budget update exceeds the allotted amount', async () => {
                
                const mockedUser = { 
                    _id: '6303522765', 
                    username: 'Varun',
                    totalIncome: 10000, 
                    amountUsed: 4000, 
                };
                const mockedBudgets = { 
                    userId: '6303522765',
                    budgets: [{ category: 'Groceries', allotedAmount: 5000, spentAmount: 4500 }] 
                };
                
                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockedBudgets);

                const transaction = new Transaction(1000, 'budget', 'Groceries', 'Pulses');

                const budgetInstance = new Budget('Groceries', 5000, 4500);

                budgetInstance.update = jest.fn().mockResolvedValue('Exceeding the amount');

                const result = await transaction.addTransaction('Varun');
                console.log(result);
                expect(result).toBe('Exceeds');
            });

            test('should return Success and add the transaction if budget update is successful', async () => {

                const mockedUser = {
                    _id: '6303522765',
                    username: 'Varun',
                    totalIncome: 10000,
                    amountUsed: 4000,
                    save: jest.fn()
                };
                const mockedBudgets = {
                    userId: mockedUser._id,
                    budgets: [{ category: 'Groceries', allotedAmount: 5000, spentAmount: 4500 }]
                };
                const mockedTransaction = {
                    userId: mockedUser._id,
                    transactions: [],
                    save: jest.fn()
                };
                
                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockedBudgets);
                (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockedTransaction);
            
                const budget = new Budget('Groceries', 5000, 4500);
                (budget.update as jest.Mock).mockResolvedValue('Success');
            
                const transaction = new Transaction(300, 'budget', 'Groceries', 'Carrots');
                
                const result = await transaction.addTransaction('Varun');
                const result2 = await budget.update(mockedUser._id, 300);
            
                console.log('Updated Transactions:', mockedTransaction.transactions);  // Debugging log
                console.log('User after transaction:', mockedUser);  // Debugging log
            
                expect(result2).toBe('Success');
                expect(mockedTransaction.transactions).toContainEqual({
                    amount: 300,
                    txnCategory: 'budget',
                    name: 'Groceries',
                    date: transaction.date,
                    description: 'Carrots',
                });
            
                expect(mockedTransaction.save).toHaveBeenCalled();
                expect(result).toBe('Success');
                
            });
        });

        describe('Tests related to the Saving Goal transactions', () => {

            test('should return Empty Saving Goals if no saving goals exist', async () => {
                const mockedUser = { 
                    _id: '6303522765', 
                    username:'Varun',
                    totalIncome: 10000, 
                    amountUsed: 4000 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(null);

                const transaction = new Transaction(1000, 'savinggoal', 'Vacation', 'Thailand savings');
                const result = await transaction.addTransaction('Varun');

                expect(result).toBe('Empty Saving Goals');
            });

            test('should return Saving Goal Not Found if the saving goal does not exist', async () => {
                const mockedUser = { 
                    _id: '6303522765', 
                    username: 'Varun',
                    totalIncome: 1000, 
                    amountUsed: 400 
                };
                const mockedGoals = { 
                    userId: mockedUser._id,
                    goals: [{ title: 'Car', targetAmount:200000, currentAmount: 40000 }] 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoals);

                const transaction = new Transaction(100, 'savinggoal', 'Vacation', 'Thailand savings');
                const result = await transaction.addTransaction('Varun');

                expect(result).toBe('Saving Goal Not Found');
            });

            test('should return Exceeds if saving goal progress exceeds the target amount', async () => {
                
                const mockedUser = { 
                    _id: '6303522765',
                    username: 'Varun',
                    totalIncome: 1000, 
                    amountUsed: 400 
                };

                const mockedGoals = { 
                    userId: mockedUser._id,
                    goals: [{ title: 'Vacation', targetAmount: 1000, currentAmount: 950 }] 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoals);

                const savingGoalInstance = new SavingsGoal('Vacation', 1000, 950);
                (savingGoalInstance.progress as jest.Mock).mockResolvedValue('Exceeding the amount');

                const transaction = new Transaction(100, 'savinggoal', 'Vacation', 'Vacation savings');
                const result = await transaction.addTransaction('Varun');

                expect(result).toBe('Exceeds');
            });

            test('should return Success and add the transaction if saving goal progress is successful', async () => {
                
                const mockedUser = { 
                    _id: '6303522765',
                    username:'Varun', 
                    totalIncome: 1000, 
                    amountUsed: 400, 
                    save: jest.fn() 
                };
                const mockedGoals = { 
                    userId: mockedUser._id,
                    goals: [{ title: 'Vacation', targetAmount: 1000, currentAmount: 900 }]
                };

                const mockTransaction = { 
                    userId: mockedUser._id,
                    transactions: [], 
                    save: jest.fn() 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoals);
                (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockTransaction);

                const savingGoalInstance = new SavingsGoal('Vacation', 1000, 900);
                (savingGoalInstance.progress as jest.Mock).mockResolvedValue('Success');

                const transaction = new Transaction(100, 'savinggoal', 'Vacation', 'Vacation savings');
                const result = await transaction.addTransaction('Varun');

                expect(mockTransaction.transactions).toContainEqual({
                    amount: 100,
                    txnCategory: 'savinggoal',
                    name: 'Vacation',
                    date: transaction.date,
                    description: 'Vacation savings',
                });
                expect(mockTransaction.save).toHaveBeenCalled();
                expect(result).toBe('Success');
            });
        });

        describe('Tests realted to the other category transactions', () => {

            test('should return Success and update the users income when transaction is in other category', async () => {
                
                const mockedUser = { 
                    _id: '6303522765',
                    username: 'Varun', 
                    totalIncome: 1000, 
                    amountUsed: 400, 
                    save: jest.fn() 
                };
                const mockTransaction = { 
                    userId: mockedUser._id,
                    transactions: [], 
                    save: jest.fn() 
                };

                (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
                (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockTransaction);

                const transaction = new Transaction(100, 'other', 'Salary', 'some source of income');
                const result = await transaction.addTransaction('Varun');

                expect(mockedUser.totalIncome).toBe(1100); 
                expect(mockTransaction.transactions).toContainEqual({
                    amount: 100,
                    txnCategory: 'other',
                    name: 'Salary',
                    date: transaction.date,
                    description: 'some source of income',
                });
                expect(mockTransaction.save).toHaveBeenCalled();
                expect(result).toBe('Success');
            });
        });
    });
});
