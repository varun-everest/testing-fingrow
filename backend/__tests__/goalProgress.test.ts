import User from '../src/classes/User';
import UserModel from '../src/collections/user.collection';
import SavingGoalsModel from '../src/collections/savingsgoals.collection';

jest.mock('../src/collections/user.collection');
jest.mock('../src/collections/savingsgoals.collection');

describe('Tests related to checking goal progress', () => {
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

        await user.checkGoalProgress('Iphone');

        expect(console.log).toHaveBeenCalledWith("User does not exists");
    });

    test('should give an error if no goals exist for the user', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce(null);

        await user.checkGoalProgress('Iphone');

        expect(console.log).toHaveBeenCalledWith("No goals exists for this user");
    });

    test('should correctly calculate progress for an existing goal', async () => {
        const title = 'Iphone';
        const targetAmount = 10000;
        const currentAmount = 9000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            goals: [{ title, targetAmount, currentAmount }],
        });

        await user.checkGoalProgress(title);

        expect(console.log).toHaveBeenCalledWith(`Progress for Goal --> ${title} : 90.00`);
        expect(console.log).toHaveBeenCalledWith(`Hurray you have saved 90.00% of your savings`);
    });

    test('should give an error if the goal exists but has no target amount', async () => {
        const title = 'Iphone';
        const currentAmount = 5000;

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            goals: [{ title, targetAmount: null, currentAmount }],
        });

        await user.checkGoalProgress(title);

        expect(console.log).toHaveBeenCalledWith(`No goal found with the title : ${title}`);
    });

    test('should give an error if the goal does not exist', async () => {
        const title = 'Iphone';

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: '670dfd579aa9cedda891c967' });
        (SavingGoalsModel.findOne as jest.Mock).mockResolvedValueOnce({
            userId: '670dfd579aa9cedda891c967',
            goals: [],
        });

        await user.checkGoalProgress(title);

        expect(console.log).toHaveBeenCalledWith(`No goal found with the title : ${title}`);
    });
});
