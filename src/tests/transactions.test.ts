import { transaction } from "../controllers/Transaction";

describe('Tests related to Transactions', () => {

    test('should credit the amount', ()=>{
        expect(transaction(-1000, 'debit')).toBe('Amount must be greater than 0');
    });

    test('should credit the amount', ()=>{
        expect(transaction(-1000, 'credit')).toEqual('Amount must be greater than 0');
    });

    test('should debit the amount less than the available balance', ()=>{
        expect(transaction(100000, 'debit')).toBe('Insufficient balance');
    });

    test('should debit the amount less than the available balance', ()=>{
        expect(transaction(1000, 'debit')).toBe('Successfully Debited');
    });

    test('should credit the amount', ()=>{
        expect(transaction(1000, 'credit')).toBe('Successfully credited amount');
        
    });

});