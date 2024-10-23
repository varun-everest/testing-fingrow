import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataContext } from '../../Context/Context';
import RecentTransactions from './RecentTransactions';

type recenttxn = {
    txnCategory: string,
    amount: number,
    description: string,
    name: string,
    date: string,
}

jest.mock('./TransactionTile', () => {
    return function MockTransactionTile({ txnCategory, amount, description, name, date }: recenttxn) {
        return (
            <div data-testid="mock-tile">
                <p>{txnCategory}</p>
                <p>{name}</p>
                <p>{description}</p>
                <p>{amount}</p>
                <p>{date}</p>
            </div>
        );
    };
});

describe('RecentTransactions Component', () => {
    test('renders "No Transactions!!" when there are no recent transactions', () => {
        const mockData = {
            recentTxns: [],
            username: '',
            setUserName: jest.fn(),
            isLogin: true,
            setIsLogin: jest.fn(),
            setRecentTxns: jest.fn(),
            fetchTxns: jest.fn(),
        };

        render(
            <DataContext.Provider value={mockData}>
                <RecentTransactions />
            </DataContext.Provider>
        );

        expect(screen.getByText('No Transactions!!')).toBeInTheDocument();
    });

    test('renders transaction tiles when recent transactions are present', () => {
        const mockTransactions = [
            {
                txnCategory: 'budget',
                amount: 500,
                description: 'Vegetables',
                name: 'Groceries',
                date: '2024-10-20',
            },
            {
                txnCategory: 'savinggoal',
                amount: 30000,
                description: 'Thailand savings',
                name: 'Vacation',
                date: '2024-10-21',
            },
        ];

        const mockData = {
            recentTxns: mockTransactions,
            username: '',
            setUserName: jest.fn(),
            isLogin: true,
            setIsLogin: jest.fn(),
            setRecentTxns: jest.fn(),
            fetchTxns: jest.fn(),
        };

        render(
            <DataContext.Provider value={mockData}>
                <RecentTransactions />
            </DataContext.Provider>
        );

        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText(500)).toBeInTheDocument();
        expect(screen.getByText('10/20/2024')).toBeInTheDocument(); 

        expect(screen.getByText('Vacation')).toBeInTheDocument();
        expect(screen.getByText('Thailand savings')).toBeInTheDocument();
        expect(screen.getByText(30000)).toBeInTheDocument();
        expect(screen.getByText('10/21/2024')).toBeInTheDocument(); 
    });
});
