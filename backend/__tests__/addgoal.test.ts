import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import SavingGoalsModel from '../src/collections/savingsgoals.collection';
import SavingGoal from '../src/classes/SavingGoal';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/savingsgoals.collection');

describe('Tests related to adding saving goal', () => {
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

        await user.addGoal('Iphone', 100000);

        expect(console.log).toHaveBeenCalledWith("User does not exists");
    });

    test('should successfully add a new goal when no goals exist', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967', save : jest.fn() });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce(null);
        (SavingGoalsModel.create as jest.Mock).mockResolvedValueOnce({ 
            userId: '670dfd579aa9cedda891c967', 
            goals: [], 
            save: jest.fn(),
        });

        await user.addGoal('Iphone', 10000);

        expect(SavingGoalsModel.create).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967', goals: [] });
        expect(console.log).toHaveBeenCalledWith('Successfully added new Goal');
    });

    test('should successfully add a new goal when goals exist but the given goal does not', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967', save: jest.fn() });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            goals: [{ title: 'Vacation', targetAmount: 5000 }],
            save: jest.fn()
        });
        
        const userGoals = {
            userId: '670dfd579aa9cedda891c967',
            goals: [{ title: 'Vacation', targetAmount: 5000 }],
            save: jest.fn()
        };

        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce(userGoals);

        await user.addGoal('Bike', 10000);

        expect(userGoals.goals).toContainEqual({ title: 'Vacation', targetAmount: 5000 });
        expect(console.log).toHaveBeenCalledWith('Successfully added new Goal');
    });

    test('should not add goal if the goal already exists', async () => {
        const title = 'Iphone';
        const targetAmount = 100000;
    
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967', save: jest.fn() });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            goals: [{ title, targetAmount }],
            save: jest.fn(),
        });
    
        await user.addGoal(title, targetAmount);
    
        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(SavingGoalsModel.findOne).toHaveBeenCalledWith({ userId: '670dfd579aa9cedda891c967' });
        // expect(console.log).toHaveBeenCalledWith("Goal already exists. Cannot be added");
    });    
});
