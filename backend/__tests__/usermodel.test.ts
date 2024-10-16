import mongoose from 'mongoose';
import UserModel from '../src/collections/user.collection'; 

describe('User Model', () => {
    beforeAll(() => {
        mongoose.connect('mongodb://127.0.0.1:27017/FingrowTestDB');
    });

    afterAll(async () => {
        // await mongoose.disconnect();
    })

    test('should create the User model successfully', () => { 
        expect(UserModel).toBeDefined();
        expect(UserModel.modelName).toBe('Users');
    });

    test('should have the correct schema properties in the model', () => {
        const schema = UserModel.schema;

        expect(schema.paths).toHaveProperty('username');
        expect(schema.paths).toHaveProperty('password');
        expect(schema.paths).toHaveProperty('totalIncome');
        expect(schema.paths).toHaveProperty('amountUsed');
        expect(schema.paths.username.instance).toBe('String');
        expect(schema.paths.password.instance).toBe('String');
        expect(schema.paths.totalIncome.instance).toBe('Number');
        expect(schema.paths.amountUsed.instance).toBe('Number');
        expect(schema.paths.username.isRequired).toBe(true);
        expect(schema.paths.password.isRequired).toBe(true);
        expect(schema.paths.totalIncome.isRequired).toBe(true);
    });
});


