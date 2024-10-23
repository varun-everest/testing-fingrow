import mongoose from 'mongoose';
import UserModel from '../collections/user.collection'; 


beforeAll(async () => {
    const mongoDbURI = 'mongodb://127.0.0.1/fingrow_testDB'; 
    await mongoose.connect(mongoDbURI);
});

afterAll(async () => {
    await UserModel.deleteMany({}); 
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close();
});

describe('Tests Related to the User Model Collection', () => {

    beforeEach(async () => {
        await UserModel.deleteMany({}); 
    });

    test('should create a user with the given valid data', async () => {
        const userData = {
            username: 'Varun',
            password: 'V@run765',
            totalIncome: 10000
        };
        
        const user = await UserModel.create(userData);
        
        expect(user.username).toBe(userData.username);
        expect(user.password).toBe(userData.password);
        expect(user.totalIncome).toBe(userData.totalIncome);
        expect(user.amountUsed).toBe(0);
    });

    test('should not create a user without a username', async () => {
        const userData = {
            password: 'V@run765',
            totalIncome: 10000
        };

        await expect(UserModel.create(userData)).rejects.toThrow();
    });

    test('should not create a user without a password', async () => {
        const userData = {
            username: 'Varun',
            totalIncome: 10000
        };

        await expect(UserModel.create(userData)).rejects.toThrow();
    });

    test('should not create a user without totalIncome', async () => {
        const userData = {
            username: 'Varun',
            password: 'V@run765',
        };

        await expect(UserModel.create(userData)).rejects.toThrow();
    });

    test('should not take the duplicate usernames', async () => {
        const userData = {
            username: 'Varun',
            password: 'password123',
            totalIncome: 10000
        };

        await UserModel.create(userData);

        await expect(UserModel.create(userData)).rejects.toThrow();
    });

    test('should set default amountUsed to 0', async () => {
        const userData = {
            username: 'Varun',
            password: 'password123',
            totalIncome: 10000
        };
        
        const user = await UserModel.create(userData);
        expect(user.amountUsed).toBe(0);
    });
});
