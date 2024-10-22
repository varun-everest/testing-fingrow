import mongoose from 'mongoose';
import startDatabase from '../database/connection'; 

jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('Tests related to the Database Connection', () => {

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('should give success message when database connection is successful', async () => {
        (mongoose.connect as jest.Mock).mockResolvedValueOnce('Connected');

        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

        await startDatabase();

        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://127.0.0.1:27017/fingrow');
        expect(mockConsoleLog).toHaveBeenCalledWith('Successfully connected to database.');

        mockConsoleLog.mockRestore(); 
    });

    test('should give an error message when database connection fails', async () => {
        const mockError = new Error('Connection failed');
        (mongoose.connect as jest.Mock).mockRejectedValueOnce(mockError); 

        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

        await startDatabase();

        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://127.0.0.1:27017/fingrow');
        expect(mockConsoleLog).toHaveBeenCalledWith('Error Occurred : ', mockError);

        mockConsoleLog.mockRestore(); 
    });
});
