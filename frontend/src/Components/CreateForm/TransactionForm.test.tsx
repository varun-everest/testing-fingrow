import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TransactionForm from './TransactionForm';

describe('Tests related to the TransactionForm Component', () => {

    let handleSubmitMock: jest.Mock;

    beforeEach(() => {
        handleSubmitMock = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <TransactionForm handleSubmit={handleSubmitMock} />
        );
    };

    test('should render form with inputs and submit button', () => {
        
        renderComponent();

        const txnCategoryInput = screen.getByPlaceholderText('On Category');
        const nameInput = screen.getByPlaceholderText('Name');
        const amountInput = screen.getByPlaceholderText('Amount');
        const dateInput = screen.getByPlaceholderText('Date');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const submitButton = screen.getByRole('button', { name: /Add/i });

        expect(txnCategoryInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(amountInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('should initialize all the inputs as empty', () => {
        
        renderComponent();

        const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
        const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
        const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;

        expect(txnCategoryInput.value).toBe('');
        expect(nameInput.value).toBe('');
        expect(amountInput.value).toBe('');
        expect(dateInput.value).toBe('');
        expect(descriptionInput.value).toBe('');
    });

    test('should update the txnCategory when it gets changed', () => {
        
        renderComponent();

        const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;

        fireEvent.change(txnCategoryInput, { target: { value: 'Food' } });
        expect(txnCategoryInput.value).toBe('Food');
    });

    test('should update name when it gets changed', () => {
        
        renderComponent();

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Groceries' } });
        expect(nameInput.value).toBe('Groceries');
    });

    test('should update amount when it gets changed', () => {
        
        renderComponent();

        const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;

        fireEvent.change(amountInput, { target: { value: '50' } });
        expect(amountInput.value).toBe('50');
    });

    test('should update date when it gets changed', () => {
        
        renderComponent();

        const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;

        fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
        expect(dateInput.value).toBe('2024-10-22');
    });

    test('should update description when it gets changed', () => {
        
        renderComponent();

        const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;

        fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });
        expect(descriptionInput.value).toBe('Bought groceries');
    });

    test('should call handleSubmit with correct values when the form is submitted', async () => {
        
        renderComponent();

        const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
        const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
        const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(txnCategoryInput, { target: { value: 'Food' } });
        fireEvent.change(nameInput, { target: { value: 'Groceries' } });
        fireEvent.change(amountInput, { target: { value: '50' } });
        fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
        fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmitMock).toHaveBeenCalledWith('Food', 'Groceries', 50, '2024-10-22', 'Bought groceries');
        });
    });

    test('should clear all the inputs after form submission', async () => {
        
        renderComponent();

        const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
        const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
        const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(txnCategoryInput, { target: { value: 'Food' } });
        fireEvent.change(nameInput, { target: { value: 'Groceries' } });
        fireEvent.change(amountInput, { target: { value: '50' } });
        fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
        fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(txnCategoryInput.value).toBe('');
            expect(nameInput.value).toBe('');
            expect(amountInput.value).toBe('');
            expect(dateInput.value).toBe('');
            expect(descriptionInput.value).toBe('');
        });
    });
});
