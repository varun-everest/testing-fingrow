import React from 'react';
import { render, screen } from '@testing-library/react';
import Report from './Report';

describe('Report Component', () => {

    const summary = {
        'Groceries': 2000,
        'Medical': 1500,
        'Entertainment': 1000,
    };

    test('renders report title and summary data', () => {
        render(<Report reportType="Budget Summary" summary={summary} />);

        expect(screen.getByText('Budget Summary')).toBeInTheDocument();
        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.getByText('2000')).toBeInTheDocument();
        expect(screen.getByText('Medical')).toBeInTheDocument();
        expect(screen.getByText('1500')).toBeInTheDocument();
        expect(screen.getByText('Entertainment')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });

    test('renders Total Summary with total income and total expenses', () => {
        render(
            <Report 
                reportType="Total Summary"
                summary={summary}
                totalIncome="5000"
                totalExpenses="450"
            />
        );

       
        expect(screen.getByText('Total Summary')).toBeInTheDocument();
        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.getByText('2000')).toBeInTheDocument();
        expect(screen.getByText('Medical')).toBeInTheDocument();
        expect(screen.getByText('1500')).toBeInTheDocument();
        expect(screen.getByText('Entertainment')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
        expect(screen.getByText('Total Income : 5000')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses : 450')).toBeInTheDocument();
    });

    test('does not render total income and expenses if reportType is not Total Summary', () => {
        render(
            <Report 
                reportType="Expense Report"
                summary={summary}
                totalIncome="5000"
                totalExpenses="450"
            />
        );

        expect(screen.queryByText('Total Income : 5000')).not.toBeInTheDocument();
        expect(screen.queryByText('Total Expenses : 450')).not.toBeInTheDocument();
    });
});
