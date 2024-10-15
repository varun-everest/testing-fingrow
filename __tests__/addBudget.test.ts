import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import BudgetModel from '../src/collections/budget.collection';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/budget.collection');

describe('Tests related to adding the budget to the user', () => {
    const username = 'testuser';
    const password = 'password123';
    const totalIncome = 5000;
    let user: User;

    beforeEach(() => {
        user = new User(username, password, totalIncome);
        jest.clearAllMocks();
        console.log = jest.fn()
    });

    afterEach(() => {
        jest.restoreAllMocks(); 
    });

    test('should successfully add a new budget to the user budgets list', async () => {
        const category = 'Groceries';
        const allotedAmount = 2000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ 
            _id: '670dfd579aa9cedda891c967', 
            amountUsed: 0, 
            totalIncome ,
            save: jest.fn(),
        });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce(null);
        (BudgetModel.create as jest.Mock).mockResolvedValueOnce({ 
            budgets: [], 
            save: jest.fn(),
        });

        await user.addBudget(category, allotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(BudgetModel.create).toHaveBeenCalledWith({
            userId: '670dfd579aa9cedda891c967',
            budgets: []
        });
        expect(console.log).toHaveBeenCalledWith("Successfully added New Budget");
    });

    test('should not add budget if user does not exists', async () => {
        const category = 'Groceries';
        const allotedAmount = 2000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.addBudget(category, allotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith("User does not exists");
    });

    test('should not add budget if there is insufficient balance', async () => {
        const category = 'Groceries';
        const allotedAmount = 6000; 

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ 
            _id: '670dfd579aa9cedda891c967', 
            amountUsed: 0, 
            totalIncome 
        });

        await user.addBudget(category, allotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(console.log).toHaveBeenCalledWith("Cannot add Budget!.. You don't have sufficent balance");
    });

    test('should not add budget if budget already exists', async () => {
        const category = 'Groceries';
        const allotedAmount = 200;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ 
            _id: '670dfd579aa9cedda891c967', 
            amountUsed: 0, 
            totalIncome 
        });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce({
            budgets: [{ category, allotedAmount }]
        });

        await user.addBudget(category, allotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(console.log).toHaveBeenCalledWith("Budget already exists. Cannot be added");
    });

    test('should create budget when no existing budgets are present', async () => {
        const category = 'Entertainment';
        const allotedAmount = 3000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ 
            _id: '670dfd579aa9cedda891c967', 
            amountUsed: 0, 
            totalIncome,
            save: jest.fn()  
        });
        (BudgetModel.findOne as jest.Mock).mockResolvedValueOnce(null);
        (BudgetModel.create as jest.Mock).mockResolvedValueOnce({ 
            budgets: [], 
            save: jest.fn() 
        });

        await user.addBudget(category, allotedAmount);

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(BudgetModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        expect(BudgetModel.create).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith("Successfully added New Budget");
    });
});
