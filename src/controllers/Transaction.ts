import {currentUser} from '../data/data';
import { TTransaction } from '../types/types';

const addTransaction = (amount: number, transactionType:string, note:string) => {
    const newTransaction : TTransaction  = {
        transactionType : transactionType,
        amount: amount,
        date : new Date(),
        description: note
    }
    currentUser.transactions.push(newTransaction);
}

export const transaction = (amount: number, transactionType:string, note: string) => {
    if(amount <= 0) {
        return 'Amount must be greater than 0'
    }
    if(transactionType === 'debit') {
        if(currentUser.otherIncome < amount) {
            return `Insufficient balance`
        }
        currentUser.otherIncome -= amount;
        addTransaction(amount, transactionType, '');
        return 'Successfully Debited'
    }
    else if(transactionType === 'credit') {
        currentUser.otherIncome += amount;
        addTransaction(amount, transactionType, '');
        return 'Successfully credited amount'
    }
}