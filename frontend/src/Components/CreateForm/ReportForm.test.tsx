import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReportForm from './ReportForm';

describe('Tests related to the ReportForm Component', () => {
    let handleSubmitMock: jest.Mock;

    beforeEach(() => {
        handleSubmitMock = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <ReportForm handleSubmit={handleSubmitMock} />
        );
    };

    test('should render form with report type select, start date, end date and a submit button', () => {
        
        renderComponent();

        const reportTypeSelect = screen.getByRole('combobox');
        const startDateInput = screen.getByPlaceholderText('From');
        const endDateInput = screen.getByPlaceholderText('To');
        const submitButton = screen.getByRole('button', { name: /Generate/i });
        expect(reportTypeSelect).toBeInTheDocument();
        expect(startDateInput).toBeInTheDocument();
        expect(endDateInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('should initialize the inputs with correct default values', () => {
        renderComponent();

        const reportTypeSelect = screen.getByRole('combobox') as HTMLSelectElement;
        const startDateInput = screen.getByPlaceholderText('From') as HTMLInputElement;
        const endDateInput = screen.getByPlaceholderText('To') as HTMLInputElement;

        expect(reportTypeSelect.value).toBe('Total Summary');
        expect(startDateInput.value).toBe('');
        expect(endDateInput.value).toBe('');
    });

    test('should update the report type when a different option gets selected', () => {
        
        renderComponent();

        const reportTypeSelect = screen.getByRole('combobox') as HTMLSelectElement;

        fireEvent.change(reportTypeSelect, { target: { value: 'Budget Summary' } });
        expect(reportTypeSelect.value).toBe('Budget Summary');
    });

    test('should update start date when it gets changed', () => {
        
        renderComponent();

        const startDateInput = screen.getByPlaceholderText('From') as HTMLInputElement;

        fireEvent.change(startDateInput, { target: { value: '2024-10-10' } });
        expect(startDateInput.value).toBe('2024-10-10');
    });

    test('should update end date when it gets changed', () => {
        
        renderComponent();

        const endDateInput = screen.getByPlaceholderText('To') as HTMLInputElement;

        fireEvent.change(endDateInput, { target: { value: '2024-10-15' } });
        expect(endDateInput.value).toBe('2024-10-15');
    });

    test('should call handleSubmit with correct values when form is submitted', async () => {
        renderComponent();

        const reportTypeSelect = screen.getByRole('combobox') as HTMLSelectElement;
        const startDateInput = screen.getByPlaceholderText('From') as HTMLInputElement;
        const endDateInput = screen.getByPlaceholderText('To') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Generate/i });

        fireEvent.change(reportTypeSelect, { target: { value: 'Budget Summary' } });
        fireEvent.change(startDateInput, { target: { value: '2024-10-01' } });
        fireEvent.change(endDateInput, { target: { value: '2024-10-15' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmitMock).toHaveBeenCalledWith('Budget Summary', '2024-10-01', '2024-10-15');
        });
    });

    test('should clear inputs after the successful form submission', async () => {
        
        renderComponent();

        const reportTypeSelect = screen.getByRole('combobox') as HTMLSelectElement;
        const startDateInput = screen.getByPlaceholderText('From') as HTMLInputElement;
        const endDateInput = screen.getByPlaceholderText('To') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Generate/i });

        fireEvent.change(reportTypeSelect, { target: { value: 'Saving Goals Summary' } });
        fireEvent.change(startDateInput, { target: { value: '2024-09-01' } });
        fireEvent.change(endDateInput, { target: { value: '2024-09-30' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(reportTypeSelect.value).toBe('Total Summary');  
        expect(startDateInput.value).toBe('');                
        expect(endDateInput.value).toBe('');                  
        });
    });

    test('should require all the fields', () => {
        renderComponent();

        const reportTypeSelect = screen.getByRole('combobox');
        const startDateInput = screen.getByPlaceholderText('From');
        const endDateInput = screen.getByPlaceholderText('To');

        expect(reportTypeSelect).toHaveAttribute('required');
        expect(startDateInput).toHaveAttribute('required');
        expect(endDateInput).toHaveAttribute('required');
    });
});
