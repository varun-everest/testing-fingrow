import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import Transaction from '../src/classes/Transaction';
import BudgetModel from '../src/collections/budget.collection';
import SavingGoalsModel from '../src/collections/savingsgoals.collection';
import TransactionModel from '../src/collections/transactions.collection';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/budget.collection');
jest.mock('../src/collections/savingsgoals.collection');
jest.mock('../src/collections/transactions.collection');

describe('Tests for makeTransaction method', () => {
    const username = 'varun';
    const password = 'V@run765';
    const totalIncome = 5000;
    const user = new User(username, password, totalIncome);

    beforeEach(() => {
        jest.clearAllMocks();
        console.log = jest.fn(); 
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should give an error if user does not exist', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.makeTransaction(100, 'budget', 'Groceries', 'Grocery shopping');

        expect(console.log).toHaveBeenCalledWith('User does not exists');
    });

    test('should give an  error if budget does not exist', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({username});
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce(null);
        
        await user.makeTransaction(100, 'budget', 'Groceries', 'Weekly grocery shopping');

        expect(console.log).toHaveBeenCalledWith('User does not exists');
    });
});