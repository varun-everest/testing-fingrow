import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from './Form';

describe('Tests Related to the Form Component', () => {
    let handleSubmitMock: jest.Mock;

    beforeEach(() => {
        handleSubmitMock = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <Form input1="Enter Name" input2="Enter Amount" handleSubmit={handleSubmitMock} />
        );
    };

    test('should render form with name and amount inputs and a submit button', () => {
        
        renderComponent();

        const nameInput = screen.getByPlaceholderText('Enter Name');
        const amountInput = screen.getByPlaceholderText('Enter Amount');
        const submitButton = screen.getByRole('button', { name: /Create/i });

        expect(nameInput).toBeInTheDocument();
        expect(amountInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('should initialize inputs with empty values', () => {
        
        renderComponent();

        const nameInput = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
        const amountInput = screen.getByPlaceholderText('Enter Amount') as HTMLInputElement;

        expect(nameInput.value).toBe('');
        expect(amountInput.value).toBe('');
    });

    test('should update the name input field on change', () => {

        renderComponent();

        const nameInput = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Groceries' } });
        expect(nameInput.value).toBe('Groceries');
    });

    test('should update the amount input field on change', () => {
        
        renderComponent();

        const amountInput = screen.getByPlaceholderText('Enter Amount') as HTMLInputElement;

        fireEvent.change(amountInput, { target: { value: '1500' } });
        expect(amountInput.value).toBe('1500');
    });

    test('should call handleSubmit with correct values when the form is submitted', async () => {
        
        renderComponent();

        const nameInput = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
        const amountInput = screen.getByPlaceholderText('Enter Amount') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Create/i });

        fireEvent.change(nameInput, { target: { value: 'Groceries' } });
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(handleSubmitMock).toHaveBeenCalledWith('Groceries', 1000);
        });
    });

    test('should clear all the input fields after successful form submission', async () => {
        
        renderComponent();

        const nameInput = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
        const amountInput = screen.getByPlaceholderText('Enter Amount') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Create/i });

        fireEvent.change(nameInput, { target: { value: 'Vacation' } });
        fireEvent.change(amountInput, { target: { value: '10000' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(amountInput.value).toBe('');
        });
    });

    test('should require both name and amount inputs', () => {
        
        renderComponent();

        const nameInput = screen.getByPlaceholderText('Enter Name');
        const amountInput = screen.getByPlaceholderText('Enter Amount');

        expect(nameInput).toHaveAttribute('required');
        expect(amountInput).toHaveAttribute('required');
    });

    test('should accept only numbers in the amount input', () => {
        
        renderComponent();

        const amountInput = screen.getByPlaceholderText('Enter Amount') as HTMLInputElement;

        fireEvent.change(amountInput, { target: { value: 'abc' } });
        expect(amountInput.value).toBe('');

        fireEvent.change(amountInput, { target: { value: '1000' } });
        expect(amountInput.value).toBe('1000');
    });
});
