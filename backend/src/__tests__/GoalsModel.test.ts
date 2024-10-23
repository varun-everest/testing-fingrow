import mongoose from 'mongoose';
import SavingGoalsModel from '../collections/savingsgoals.collection'; 


beforeAll(async () => {
    const mongoDbURI = 'mongodb://127.0.0.1/fingrow_testDB'; // Use a test database
    await mongoose.connect(mongoDbURI);
});

afterAll(async () => {
    await SavingGoalsModel.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Tests related to the SavingGoals Model Collection', () => {

    beforeEach(async () => {
        await SavingGoalsModel.deleteMany({}); 
    });

    test('should default currentAmount to 0 if not givem', async () => {
        const goalData = {
            userId: new mongoose.Types.ObjectId(),
            goals: [
                {
                    title: 'Thailand Vacation',
                    targetAmount: 10000,
                },
            ],
        };

        const savingGoals = await SavingGoalsModel.create(goalData);

        expect(savingGoals).toBeDefined();
        expect(savingGoals.goals[0].currentAmount).toBe(0); 
    });

    test('should create saving goals successfully with valid data', async () => {
        const goalData = {
            userId: new mongoose.Types.ObjectId(), 
            goals: [
                {
                    title: 'Vacation',
                    targetAmount: 10000,
                    currentAmount: 2000,
                },
                {
                    title: 'Shoes',
                    targetAmount: 5000,
                }
            ],
        };

        const savingGoals = await SavingGoalsModel.create(goalData);

        expect(savingGoals).toBeDefined(); 
        expect(savingGoals.userId).toEqual(goalData.userId); 
        expect(savingGoals.goals).toHaveLength(2);
        expect(savingGoals.goals[0].title).toBe(goalData.goals[0].title); 
        expect(savingGoals.goals[0].targetAmount).toBe(goalData.goals[0].targetAmount); 
        expect(savingGoals.goals[0].currentAmount).toBe(goalData.goals[0].currentAmount); 
        expect(savingGoals.goals[1].title).toBe(goalData.goals[1].title);
        expect(savingGoals.goals[1].targetAmount).toBe(goalData.goals[1].targetAmount); 
        expect(savingGoals.goals[1].currentAmount).toBe(0); 
    });
});
