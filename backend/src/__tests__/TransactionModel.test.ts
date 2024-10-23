import mongoose from 'mongoose';
import TransactionModel from '../collections/transactions.collection'; 


beforeAll(async () => {
    const mongoDbURI = 'mongodb://127.0.0.1/fingrow_testDB'; 
    await mongoose.connect(mongoDbURI);
});

afterAll(async () => {
    await TransactionModel.deleteMany({});
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close();
});

describe('Transaction Model Creation Tests', () => {

    beforeEach(async () => {
        await TransactionModel.deleteMany({}); 
    });

    test('should create a transaction', async () => {
        const transactionData = {
            userId: new mongoose.Types.ObjectId(),
            transactions: [
                {
                    amount: 200,
                    txnCategory: 'savinggoal',
                    name: 'Emergency Fund',
                    description: 'savings for emergency fund'
                },
            ],
        };

        const transaction = await TransactionModel.create(transactionData);

        expect(transaction).toBeDefined();
        
    });

    test('should create a transaction successfully with valid data', async () => {
        const transactionData = {
            userId: new mongoose.Types.ObjectId(), 
            transactions: [
                {
                    amount: 1000,
                    txnCategory: 'budget',
                    name: 'Groceries',
                    date: new Date(),
                    description: 'Weekly grocery shopping',
                },
                {
                    amount: 5000,
                    txnCategory: 'savinggoal',
                    name: 'Iphone',
                    description: 'Iphone savings',
                }
            ],
        };

        const transaction = await TransactionModel.create(transactionData);

        expect(transaction).toBeDefined(); 
        expect(transaction.userId).toEqual(transactionData.userId); 
        expect(transaction.transactions).toHaveLength(2); 
        expect(transaction.transactions[0].amount).toBe(transactionData.transactions[0].amount); 
        expect(transaction.transactions[0].txnCategory).toBe(transactionData.transactions[0].txnCategory); 
        expect(transaction.transactions[0].name).toBe(transactionData.transactions[0].name); 
        expect(transaction.transactions[0].description).toBe(transactionData.transactions[0].description); 
        expect(transaction.transactions[1].amount).toBe(transactionData.transactions[1].amount); 
        expect(transaction.transactions[1].txnCategory).toBe(transactionData.transactions[1].txnCategory); 
        expect(transaction.transactions[1].name).toBe(transactionData.transactions[1].name); 
        expect(transaction.transactions[1].description).toBe(transactionData.transactions[1].description); 
    });
    
});
