import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import BudgetModel from '../src/collections/budget.collection';
import Budget from '../src/classes/Budget';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/budget.collection');

describe('Tests related to updating the budget', () => {
    
    const username = 'varun';
    const password = 'V@run765';
    const totalIncome = 50000;
    let user: User;

    beforeEach(() => {
        user = new User(username, password, totalIncome);
        user.budgets = [new Budget('Groceries', 200)]; 
        jest.clearAllMocks();
        console.log = jest.fn()
    });

    afterEach(() => {
        jest.restoreAllMocks(); 
    });

    test('should not update budget if user does not exist', async () => {
        const category = 'Groceries';
        const newAllotedAmount = 3000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.updateBudget(category, newAllotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith("User does not exists");
    });

    test('should not update budget if no budgets exist', async () => {
        const category = 'Groceries';
        const newAllotedAmount = 3000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.updateBudget(category, newAllotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(console.log).toHaveBeenCalledWith('No budget exists');
    });


    test('should not update budget if spent amount exceeds new allotted amount', async () => {
        const category = 'Groceries';
        const newAllotedAmount = 100; 

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            budgets: [{ category, spentAmount: 200, allotedAmount: 200 }]
        });

        await user.updateBudget(category, newAllotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(console.log).toHaveBeenCalledWith("Unable to update the budget. Already spent amount exceeds the new allotting amount");
    });

    test('should not update budget if given budget does not exist', async () => {
        const category = 'Groceries';
        const newAllotedAmount = 300;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            budgets: []
        });

        await user.updateBudget(category, newAllotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(console.log).toHaveBeenCalledWith("Given Budget does not exists");
    });

    test('should successfully update a budget', async () => {
        const category = 'Groceries';
        const newAllotedAmount = 3000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            budgets: [{ category, spentAmount: 1000, allotedAmount: 200, save: jest.fn() }]
        });

        const budgetUpdateSpy = jest.spyOn(user.budgets[0], 'updateBudget');

        await user.updateBudget(category, newAllotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(budgetUpdateSpy).toHaveBeenCalledWith(newAllotedAmount);
        expect(console.log).toHaveBeenCalledWith('Successfully updated the Budget!!!');
    });
});