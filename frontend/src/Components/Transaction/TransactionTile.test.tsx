import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTile from './TransactionTile';

describe('Tests related to the TransactionTile Component', () => {
    const txnCategory = 'budget';
    const amount = 100;
    const description = 'For Vegetables';
    const name = 'Groceries';
    const date = '2024-10-22';

    test('should renders TransactionTile component with correct props', () => {
        render(
            <TransactionTile
                txnCategory={txnCategory}
                amount={amount}
                description={description}
                name={name}
                date={date}
            />
        );

        const categoryElement = screen.getByText(/budget/i); 
        const nameElement = screen.getByText(name);
        const descriptionElement = screen.getByText(description);
        const amountElement = screen.getByText(amount);
        const dateElement = screen.getByText(date);

        expect(categoryElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(amountElement).toBeInTheDocument();
        expect(dateElement).toBeInTheDocument();
    });
});
