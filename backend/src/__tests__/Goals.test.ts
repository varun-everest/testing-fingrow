import SavingsGoal from '../services/SavingsGoal'; 
import UserModel from '../collections/user.collection';
import SavingGoalsModel from '../collections/savingsgoals.collection';


jest.mock('../collections/user.collection', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../collections/savingsgoals.collection', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
}));

describe('Tests related to SavingsGoal service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Tests related to addGoal method in the savingsGoal service', () => {

        test('should return User Not found if the user does not exist', async () => {
            
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            const savingsGoal = new SavingsGoal('Vacation', 20000);
            const result = await savingsGoal.addGoal('Virat');
            
            expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Virat' });
            expect(result).toBe('User Not found');
        });

        test('should add a new goal and return Successfully added if user has no existing goals', async () => {
            
            const mockedUser = { 
                _id: '6303522765',
                username: 'Virat'
             };
            const mockedGoal = { goals: [], save: jest.fn() };

            (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);

            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(null);
            (SavingGoalsModel.create as jest.Mock).mockResolvedValue(mockedGoal);

            const savingsGoal = new SavingsGoal('Vacation', 2000);

            const result = await savingsGoal.addGoal('Virat');

            expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Virat' });
            expect(SavingGoalsModel.create).toHaveBeenCalledWith({
                userId: mockedUser._id,
                goals: [],
            });
            expect(mockedGoal.goals).toContainEqual({
                title: 'Vacation',
                targetAmount: 2000,
            });
            expect(result).toBe('Successfully added');
        });

        test('should add a new goal to an existing list and return Successfully added', async () => {
            
            const mockedUser = {
                 _id: '6303522765',
                 username: "Virat" 
            };
            const mockedGoal = { goals: [], save: jest.fn() };

            (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoal);

            const savingsGoal = new SavingsGoal("Thailand Vacation", 3000)

            const result = await savingsGoal.addGoal('Virat');

            expect(mockedGoal.goals).toContainEqual({
                title: 'Thailand Vacation',
                targetAmount: 3000,
            });
            expect(mockedGoal.save).toHaveBeenCalled();
            expect(result).toBe('Successfully added');
        });

        test('should return Saving Goal already exists if the goal already exists', async () => {
            const mockedUser = {
                _id: '6303522765',
                username: "Virat" 
           };
            const mockedGoal = {
                goals: [{ title: 'Vacation', targetAmount: 10000 }],
                save: jest.fn(),
            };
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoal);

            const savingsGoal = new SavingsGoal('Vacation', 10000);
            const result = await savingsGoal.addGoal('Virat');

            expect(result).toBe('Saving Goal already exists');
        });
    });

    describe('Tests related to the progress method in SavingsGoal service', () => {

        test('should return Exceeding the amount if the progress exceeds the target amount', async () => {
            
            const mockedGoal = {
                goals: [{ title: 'Vacation', targetAmount: 10000, currentAmount: 9000 }],
                save: jest.fn(),
            };
            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoal);

            const savingsGoal = new SavingsGoal('Vacation', 10000, 9000);
            const result = await savingsGoal.progress('6303522765', 2000); 

            expect(result).toBe('Exceeding the amount');
        });

        test('should update the current amount and return Success for valid data', async () => {
            
            const mockedGoal = {
                goals: [{ title: 'Vacation', targetAmount: 10000, currentAmount: 8000 }],
                save: jest.fn(),
            };

            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoal);

            const savingsGoal = new SavingsGoal('Vacation', 10000);
            const result = await savingsGoal.progress('6303522765', 1000); 

            const updatedGoal = mockedGoal.goals.find((g) => g.title === 'Vacation');
            
            expect(updatedGoal?.currentAmount).toBe(9000); 
            expect(mockedGoal.save).toHaveBeenCalled();
            expect(result).toBe('Success');
        });

        test('should gives an alert a message when progress reaches 90% of the target amount', async () => {
            
            const mockedGoal = {
                goals: [{ title: 'Vacation', targetAmount: 10000, currentAmount: 8000 }],
                save: jest.fn(),
            };

            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoal);
            
            const mockConsole = jest.spyOn(console, 'log').mockImplementation();

            const savingsGoal = new SavingsGoal('Vacation', 10000);
            const result = await savingsGoal.progress('6303522765', 1100); 

            expect(mockConsole).toHaveBeenCalledWith('You have completed 90% of your savings');
            expect(result).toBe('Success');

            mockConsole.mockRestore();
        });

        test('should be undefined if the saving goal does not exist', async () => {

            const mockedGoal = {
                goals: [{ title: 'Iphone', targetAmount: 70000 }],
                save: jest.fn(),
            };
            (SavingGoalsModel.findOne as jest.Mock).mockResolvedValue(mockedGoal);

            const savingsGoal = new SavingsGoal("Bike", 200000);
            const result = await savingsGoal.progress('6303522765', 30000); 

            expect(result).toBeUndefined();
        });
    });
});