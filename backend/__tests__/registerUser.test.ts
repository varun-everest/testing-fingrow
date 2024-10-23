// user.test.ts
import User from '../src/classes/User'; 
import UserModel from '../src/collections/user.collection'; 

jest.mock('../src/collections/user.collection'); 

describe('Tests related to registering the new user', () => {

    const username = 'varun111';
    const password = 'V@run765';
    const totalIncome = 500000;
    let user: User;

    beforeEach(() => {
        user = new User(username, password, totalIncome);
        jest.clearAllMocks(); 
        console.log = jest.fn();
    });

    test('should successfully register a new user', async () => {
        
        (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
        (UserModel.create as jest.Mock).mockResolvedValueOnce({ save: jest.fn() });

        await user.registerUser();

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(UserModel.create).toHaveBeenCalledWith({
            username,
            password,
            totalIncome,
        });
        expect(console.log).toHaveBeenCalledWith('Successfully registered user');
    });

    test('should not register if the username already exists', async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValue({});

        await user.registerUser();

        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
        expect(UserModel.create).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('UserName already exists');
    });

    test('should handle errors during registration', async () => {
        const errorMessage = 'some error';
        (UserModel.findOne as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await user.registerUser();
        expect(console.log).toHaveBeenCalledWith("Error Occurred : ", expect.any(Error));
    });
});
