import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import BudgetModel from '../src/collections/budget.collection';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/budget.collection');

describe('User Class - checkBudgetSpent Method', () => {
    const username = 'varun';
    const password = 'V@run765';
    const totalIncome = 50000;
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

        await user.checkBudgetSpent('Groceries');

        expect(console.log).toHaveBeenCalledWith("User does not exists");
    });

    test('should give an error if no budgets exist for the user', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.checkBudgetSpent('Groceries');

        expect(console.log).toHaveBeenCalledWith("No budgets exist for this user");
    });

    test('should give an error if the specified budget category does not exist', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            budgets: [{ category: 'Rent', allotedAmount: 1000, spentAmount: 500 }]
        });

        await user.checkBudgetSpent('Groceries');

        expect(console.log).toHaveBeenCalledWith("No budget found for category: Groceries");
    });

    test('should give the allotted and spent amount if the budget category exists', async () => {
        const category = 'Groceries';
        const allottedAmount = 200;
        const spentAmount = 100;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            budgets: [{ category, allotedAmount: allottedAmount, spentAmount }]
        });

        await user.checkBudgetSpent(category);

        expect(console.log).toHaveBeenCalledWith(
            `For Category ${category} You have Allotted Amount is ${allottedAmount} and Spent Amount is ${spentAmount}`
        );
    });
});
