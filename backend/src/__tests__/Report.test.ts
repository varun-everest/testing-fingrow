import UserModel from '../collections/user.collection';
import TransactionModel from '../collections/transactions.collection';
import Report from '../services/Report'; 

jest.mock('../collections/user.collection', () => ({
    findOne: jest.fn(),
}));

jest.mock('../collections/transactions.collection', () => ({
    findOne: jest.fn(),
}));

describe('Tests Related for Report Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return Total Summary Report', async () => {
        const mockedUser = { 
            _id: '6303522765', 
            username: 'Varun' 
        };
        const mockedTransactions = { 
            userId: mockedUser._id, 
            transactions: [
                { amount: 1000, txnCategory: 'budget', name: 'Groceries', date: new Date('2024-10-01') },
                { amount: 2000, txnCategory: 'other', name: 'Salary', date: new Date('2024-10-02') },
            ] 
        };

        (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
        (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockedTransactions);

        const report = new Report('Total Summary', '2024-10-01', '2024-10-31');
        const result = await report.generateReport('Varun');

        expect(result).toEqual({
            reportType: 'Total Summary',
            totalExpenses: 1000,
            totalIncome: 2000,
            summary: {
                'Groceries': 1000,
                'Salary': 2000,
            },
        });
    });

    test('should return Budget Summary Report', async () => {
        const mockedUser = {
             _id: '6303522765', 
             username: 'Varun' 
        };
        const mockedTransactions = { 
            userId: mockedUser._id, 
            transactions: [
                { amount: 1000, txnCategory: 'budget', name: 'Groceries', date: new Date('2024-10-01') },
                { amount: 1500, txnCategory: 'budget', name: 'Entertainment', date: new Date('2024-10-03') },
            ] 
        };

        (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
        (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockedTransactions);

        const report = new Report('Budget Summary', '2024-10-01', '2024-10-31');
        const result = await report.generateReport('Varun');

        expect(result).toEqual({
            reportType: 'Budget Summary',
            summary: {
                'Groceries': 1000,
                'Entertainment': 1500,
            },
        });
    });

    test('should return Saving Goals Summary Report', async () => {
        const mockedUser = { 
            _id: '6303522765', 
            username: 'Varun' 
        };
        const mockedTransactions = { 
            userId: mockedUser._id, 
            transactions: [
                { amount: 500, txnCategory: 'savinggoal', name: 'Emergency Fund', date: new Date('2024-10-04') },
                { amount: 700, txnCategory: 'savinggoal', name: 'Thailand Vacation Fund', date: new Date('2024-10-05') },
            ] 
        };

        (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
        (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockedTransactions);

        const report = new Report('Saving Goals Summary', '2024-10-01', '2024-10-31');
        const result = await report.generateReport('Varun');

        expect(result).toEqual({
            reportType: 'Saving Goals Summary',
            summary: {
                'Emergency Fund': 500,
                'Thailand Vacation Fund': 700,
            }
        });
    });

    test('should return No Transactions Found if no transactions exist', async () => {
        const mockedUser = { 
            _id: '6303522765', 
            username: 'Varun' 
        };
        
        (UserModel.findOne as jest.Mock).mockResolvedValue(mockedUser);
        (TransactionModel.findOne as jest.Mock).mockResolvedValue(null);

        const report = new Report('Total Summary', '2024-10-01', '2024-10-31');
        const result = await report.generateReport('Varun');

        expect(result).toBe('No Transactions Found');
    });

    test('should return User Not Found if user does not exist', async () => {
        
        (UserModel.findOne as jest.Mock).mockResolvedValue(null);

        const report = new Report('Total Summary', '2024-10-01', '2024-10-31');
        const result = await report.generateReport('Varun');
        expect(result).toBe('User not found');
    });
});
