import mongoose from 'mongoose';
import startDatabase from '../src/database/connection'; 

jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('Tests related to Database Connection', () => {
    const originalConsoleLog = console.log; 

    beforeEach(() => {
        console.log = jest.fn(); 
    });

    afterEach(() => {
        console.log = originalConsoleLog; 
        jest.clearAllMocks(); 
    });

    test('should give an error if connection fails', async () => {
        const errorMessage = 'Connection error';
        (mongoose.connect as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        await startDatabase();

        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://127.0.0.1:27017/fingrow');
        expect(console.log).toHaveBeenCalledWith("Error Occurred : ", expect.any(Error));
    });

    test('should connect to the database successfully', async () => {
        await startDatabase();

        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://127.0.0.1:27017/fingrow');
        expect(console.log).toHaveBeenCalledWith('Successfully connected to database.');
    });
});
