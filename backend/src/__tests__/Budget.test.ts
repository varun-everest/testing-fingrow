import Budget from '../services/Budget';
import UserModel from '../collections/user.collection';
import BudgetModel from '../collections/budget.collection';

jest.mock('../collections/user.collection', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../collections/budget.collection', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
}));

describe('Tests related to budget service', () => {
    
    let budget: Budget;

    beforeEach(() => {
        jest.clearAllMocks();
        budget = new Budget('Entertainment', 5000);
    });

    describe('Tests related to setBudget method in Budget service', () => {

        test('should return User Not found if the user does not exist', async () => {

            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            const result = await budget.setBudget('Virat');
            
            expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Virat' });
            expect(result).toBe('User Not found');
        });

        test('should return Insufficient Balance if total income is less than the budget', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue({
                username: 'Virat',
                totalIncome: 1000,
                amountUsed: 6000,
                save: jest.fn(),
            });

            const result = await budget.setBudget('Virat');

            expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Virat' });
            expect(result).toBe('Insufficient Balance');
        });

        test('should add new budget and return Successfully added if the budget does not exist', async () => {
            
            (UserModel.findOne as jest.Mock).mockResolvedValue({
                _id: '6303522765',
                username:"Varun",
                totalIncome: 10000,
                amountUsed: 3000,
                save: jest.fn(),
            });

            (BudgetModel.findOne as jest.Mock).mockResolvedValue(null);

            const mockCreate = { 
                userId:'6303522765', 
                budgets: [], 
                save: jest.fn() 
            };

            (BudgetModel.create as jest.Mock).mockResolvedValue(mockCreate);

            const result = await budget.setBudget('Varun');

            expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Varun' });
            expect(BudgetModel.create).toHaveBeenCalledWith({
                userId: '6303522765',
                budgets: [],
            });
           
            expect(mockCreate.budgets).toContainEqual({
                category: 'Entertainment',
                allotedAmount: 5000,
            });
            expect(result).toBe('Successfully added');
        });

        test('should add budget to an existing list and return Successfully added if it does not already exist', async () => {
            
            const mockUser = {
                _id: '6303522765',
                username: 'Varun',
                totalIncome: 10000,
                amountUsed: 3000,
                save: jest.fn(),
            };

            const mockBudget = {
                userId: '6303522765',
                budgets: [],
                save: jest.fn(),
            };

            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockBudget);

            const result = await budget.setBudget('Varun');

            expect(mockUser.amountUsed).toBe(8000); 
            expect(mockBudget.budgets).toContainEqual({
                category: 'Entertainment',
                allotedAmount: 5000,
            });
            expect(result).toBe('Successfully added');
        });

        test('should return Budget already exists if a budget with the same category already exists', async () => {
            const mockUser = {
                _id: 'user123',
                username: 'Varun',
                totalIncome: 10000,
                amountUsed: 3000,
                save: jest.fn(),
            };

            const mockBudget = {
                budgets: [{ category: 'Entertainment', allotedAmount: 2000 }],
                save: jest.fn(),
            };

            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockBudget);

            const result = await budget.setBudget('Varun');

            expect(mockUser.amountUsed).toBe(3000); 
            expect(result).toBe('Budget already exists');
        });
    });

    describe('Tests related to update method in Budget service', () => {

        test('should return Exceeding the amount if the spent amount exceeds the alloted amount', async () => {
            
            const mockedBudget = {
                userId: '6303522765',
                budgets: [{ category: 'Entertainment', allotedAmount: 5000, spentAmount: 4500 }],
                save: jest.fn(),
            };

            (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockedBudget);

            const result = await budget.update('6303522765', 10000); 

            expect(result).toBe('Exceeding the amount');
        });

        test('should update the spent amount and return Success if the spent amount is within the allotted limit', async () => {
            const mockBudget = {
                budgets: [{ category: 'Food', allotedAmount: 5000, spentAmount: 3000 }],
                save: jest.fn(),
            };

            (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockBudget);
            
            let budget1 = new Budget("Food", 3000);
            const result = await budget1.update('6303522765', 1000); 

            const updatedBudget = mockBudget.budgets.find((b) => b.category === 'Food');
            expect(updatedBudget?.spentAmount).toBe(4000); 
            expect(mockBudget.save).toHaveBeenCalled();
            expect(result).toBe('Success');
        });

        test('should return undefined if the budget category does not exist', async () => {
            const mockBudget = {
                budgets: [{ category: 'Medical', allotedAmount: 3000 }],
                save: jest.fn(),
            };

            (BudgetModel.findOne as jest.Mock).mockResolvedValue(mockBudget);

            const result = await budget.update('6303522765', 1000); 

            expect(result).toBeUndefined();
        });
    });
});
