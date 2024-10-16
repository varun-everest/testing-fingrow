import { addSavingsGoal, goalProgress } from "../controllers/SavingGoals";
import { currentUser } from "../data/data";

describe('Tests related to Savings Goal', () => {
    test('Should check for existing Savings goal', () => {
        expect(addSavingsGoal('Emergency Fund', 5000, 300)).toEqual('Already exists');
    });

    test('Should add new savings goal', () => {
        expect(addSavingsGoal('Car Fund', 500000, 3000)).toEqual('New Savings Goal added successfully');
    });

    test('Should check progress for saving goal whether it exists or not', () => {
        expect(goalProgress('MY Fund')).toEqual('SavingsGoal not exists');
    });

    test('Should check progress for saving goal', () => {
        expect(goalProgress('Emergency Fund')).toEqual('Hurray!!! you saved 500 of 10000 which is 5.00%')
    });

    test('Should check progress for saving goal and alerts it', () => {
        expect(goalProgress('IPhone Savings')).toEqual('Hurray!!! you saved 9500 of 10000 which is 95.00%')
    });
});