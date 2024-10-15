import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import TransactionModel from '../src/collections/transactions.collection';
import BudgetModel from '../src/collections/budget.collection';
import SavingGoalsModel from '../src/collections/savingsgoals.collection';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/transactions.collection');
jest.mock('../src/collections/budget.collection');
jest.mock('../src/collections/savingsgoals.collection');

describe('Tests related to generating report', () => {
    const username = 'varun';
    const password = 'V@run765';
    const totalIncome = 5000;
    let user: User;

    beforeEach(() => {
        user = new User(username, password, totalIncome);
        jest.clearAllMocks();
        console.log = jest.fn(); 
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should give an error if the user does not exist', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.generateReport('total', new Date('2023-01-01'), new Date('2023-12-31'));

        expect(console.log).toHaveBeenCalledWith("User does not exist");
    });

    test('should give an error if no transactions are found', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (TransactionModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.generateReport('total', new Date('2023-01-01'), new Date('2023-12-31'));

        expect(console.log).toHaveBeenCalledWith("No transactions found");
    });

    test('should give an error if no transactions are there between the period', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (TransactionModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            transactions: [
                { date: new Date('2023-01-01'), txnCategory: 'budget', amount: 100 },
                { date: new Date('2023-02-01'), txnCategory: 'budget', amount: 50 },
            ],
        });

        await user.generateReport('total', new Date('2023-03-01'), new Date('2023-03-31'));

        expect(console.log).toHaveBeenCalledWith("No transactions are there between the period");
    });

    test('should correctly generate total report', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (TransactionModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            transactions: [
                { date: new Date('2024-01-01'), txnCategory: 'budget', amount: 100 },
                { date: new Date('2024-01-15'), txnCategory: 'savinggoal', amount: 150 },
                { date: new Date('2024-01-20'), txnCategory: 'budget', amount: 50 },
            ],
        });

        await user.generateReport('total', new Date('2024-01-01'), new Date('2024-01-31'));

        expect(console.log).toHaveBeenCalledWith(`Total Income: 150`);
        expect(console.log).toHaveBeenCalledWith(`Total Expenses: 150`);
    });

    test('should give an error for empty budget summary', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (TransactionModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            transactions: [
                { date: new Date('2024-01-01'), txnCategory: 'budget', amount: 100 },
            ],
        });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.generateReport('budget', new Date('2024-01-01'), new Date('2024-12-31'));

        expect(console.log).toHaveBeenCalledWith("No budgets found");
    });

    test('should generate budget report correctly', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (TransactionModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            transactions: [
                { date: new Date('2024-01-01'), txnCategory: 'budget', amount: 100 },
            ],
        });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            budgets: [
                { category: 'Food', allotedAmount: 200, spentAmount: 100 },
                { category: 'Movie', allotedAmount: 100, spentAmount: 50 },
            ],
        });

        await user.generateReport('budget', new Date('2024-01-01'), new Date('2024-12-31'));

        expect(console.log).toHaveBeenCalledWith(`Category: Food, Allotted: 200, Spent: 100`);
        expect(console.log).toHaveBeenCalledWith(`Category: Movie, Allotted: 100, Spent: 50`);
    });
});
