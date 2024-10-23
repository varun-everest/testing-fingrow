import User from '../services/User'; 
import UserModel from '../collections/user.collection'; 

jest.mock('../collections/user.collection', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
}));

describe('Tests related to User Service', () => {
    
    let user: User;

    beforeEach(() => {
        jest.clearAllMocks();
        user = new User('Varun', 'V@run765', 50000);
    });

    test('should return false if the user already exists', async () => {
        
        (UserModel.findOne as jest.Mock).mockResolvedValue({ username: 'Varun' });

        const result = await user.registerUser();
        
        expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Varun' });
        expect(result).toBe(false);
    });

    test('should create a new user and returns true if the user does not exist', async () => {
    
        (UserModel.findOne as jest.Mock).mockResolvedValue(null);  

        const mockCreate = { save: jest.fn() };
        (UserModel.create as jest.Mock).mockResolvedValue(mockCreate);

        const result = await user.registerUser();
        
        expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Varun' });
        expect(UserModel.create).toHaveBeenCalledWith({
            username: 'Varun',
            password: 'V@run765',
            totalIncome: 50000,
        });
        expect(mockCreate.save).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should handle the errors during user registration', async () => {

        (UserModel.findOne as jest.Mock).mockRejectedValue(new Error('Some error occurred'));

        try {
            await user.registerUser();
        } catch (error) {
            expect(error).toEqual(new Error('Some error occurred'));
        }

        expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'Varun' });
        expect(UserModel.create).not.toHaveBeenCalled();
    });
});
