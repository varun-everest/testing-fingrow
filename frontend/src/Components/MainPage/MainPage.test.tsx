import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from './MainPage';
import { DataContext } from '../../Context/Context';

const mockContextData = {
    recentTxns: [],
    username: 'Varun',
    setUserName: jest.fn(),
    isLogin: true,
    setIsLogin: jest.fn(),
    setRecentTxns: jest.fn(),
    fetchTxns: jest.fn(),
};

global.fetch = jest.fn();

describe('MainPage Component', () => {

    beforeEach(() => {
        window.alert = jest.fn();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    const renderMainPage = () => {
        return render(
            <DataContext.Provider value={mockContextData}>
                <MainPage />
            </DataContext.Provider>
        );
    };

    describe('Tests related to the Creating budget', () => {

        test('should render main title and welcome message', () => {
        
            renderMainPage();
    
            expect(screen.getByText(/FinGrow Finance Tracker/i)).toBeInTheDocument();
            expect(screen.getByText(/Welcome Varun/i)).toBeInTheDocument();
        });
    
        test('should render the hero image', () => {
    
            renderMainPage();
    
            const heroImage = screen.getByAltText(/financeImage/i);
            expect(heroImage).toBeInTheDocument();
            expect(heroImage).toHaveAttribute('src', '/assets/imag1-nobg.png');
        });
    
        test('should call handleAddBudget when the budget form is submitted with the valid details', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 201,
                    text: () => Promise.resolve('Successfully added Budget'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Category');
            const amountInput = screen.getByPlaceholderText('amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Food' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[0]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/budgets', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Successfully added Budget');
            });
        });
    
        test('should gives user Not found alert when budget form clicked without user', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 404,
                    text: () => Promise.resolve('User Not Found'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Category');
            const amountInput = screen.getByPlaceholderText('amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Food' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[0]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/budgets', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('User Not Found');
            });
        });
    
        test('should give insufficient balance alert when create budget form submitted with invalid data', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve('Insufficient balance'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Category');
            const amountInput = screen.getByPlaceholderText('amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Food' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[0]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/budgets', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Insufficient balance');
            });
        });
    
        test('should give Budget already exists alert when create budget form submitted with existed budget', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 409,
                    text: () => Promise.resolve('Budget already exists'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Category');
            const amountInput = screen.getByPlaceholderText('amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Food' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[0]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/budgets', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Budget already exists');
            });
        });
    
        test('should give some error alert when create budget form submitted', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 500,
                    text: () => Promise.resolve('Budget created failed'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Category');
            const amountInput = screen.getByPlaceholderText('amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Food' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[0]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/budgets', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Budget created failed');
            });
        });
    
        test('should handle the error when fetch fails in handleAddBudget', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.reject(new Error('Some Network Error'))
            ) as jest.Mock;
    
            console.error = jest.fn(); 
     
            renderMainPage();
     
            const categoryInput = screen.getByPlaceholderText('Category');
            const amountInput = screen.getByPlaceholderText('amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create',
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Food' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
    
            fireEvent.click(submitButton[0]);
    
            expect(categoryInput).toBeInTheDocument();
    
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(console.error).toHaveBeenCalledWith('There was a problem with the creating budget:', new Error('Some Network Error'));
                expect(window.alert).toHaveBeenCalledWith('Budget added failed');
            });
        });

    });

    describe('Tests related to the Creating Saving Goal', () => {

        test('should call handleAddGoal when the saving goal form is submitted with the valid details', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 201,
                    text: () => Promise.resolve('Successfully added Saving Goal'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Your Goal');
            const amountInput = screen.getByPlaceholderText('Target Amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[1]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/savingGoals', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Successfully added Saving Goal');
            });
        });

        test('should call handleAddGoal when the saving goal form is submitted without user', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 404,
                    text: () => Promise.resolve('User Not Found'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Your Goal');
            const amountInput = screen.getByPlaceholderText('Target Amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[1]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/savingGoals', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('User Not Found');
            });
        });

        test('should give an alert with Saving Goal already exists when the saving goal form is submitted with existing goal', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 409,
                    text: () => Promise.resolve('Saving Goal already exists'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Your Goal');
            const amountInput = screen.getByPlaceholderText('Target Amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[1]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/savingGoals', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Saving Goal already exists');
            });
        });

        test('should give an alert with Saving Goal creation failed when the saving goal form is submitted', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 500,
                    text: () => Promise.resolve('Saving Goal creation failed'),
                })
            ) as jest.Mock;
            
            renderMainPage();
        
            const categoryInput = screen.getByPlaceholderText('Your Goal');
            const amountInput = screen.getByPlaceholderText('Target Amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[1]);
    
            expect(categoryInput).toBeInTheDocument();
        
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Varun/savingGoals', expect.anything());
                expect(window.alert).toHaveBeenCalledWith('Saving Goal creation failed');
            });
        });

        test('should handle the error when fetch fails in handleAddGoal method', async () => {
    
            global.fetch = jest.fn(() =>
                Promise.reject(new Error('Some Network Error'))
            ) as jest.Mock;
    
            console.error = jest.fn(); 
     
            renderMainPage();
     
            const categoryInput = screen.getByPlaceholderText('Your Goal');
            const amountInput = screen.getByPlaceholderText('Target Amount');
            const submitButton = screen.getAllByRole('button', {
                name: 'Create'
            });
        
            fireEvent.change(categoryInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '5000' } });
            fireEvent.click(submitButton[1]);
    
            expect(categoryInput).toBeInTheDocument();
    
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(console.error).toHaveBeenCalledWith('There was a problem with the adding goal:', new Error('Some Network Error'));
                expect(window.alert).toHaveBeenCalledWith('saving goal added failed');
            });
        });

    });

    describe('Tests related to the Generating the reports', () => {

        test('should alert User not found when response status is 404 while generating the report', async () => {
            
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 404,
                    text: () => Promise.resolve('User not found'),
                })
            ) as jest.Mock;
            
            renderMainPage();
            window.alert = jest.fn();

            const reportType = screen.getByRole('combobox') as HTMLSelectElement;
            const FromDate = screen.getByPlaceholderText('From');
            const toDate = screen.getByPlaceholderText('To');
            const submitButton = screen.getAllByRole('button', {
                name: 'Generate'
            });

            fireEvent.change(reportType, { target: { value: 'Total Summary' } });
            fireEvent.change(FromDate, { target: { value: '2024-10-01' } });
            fireEvent.change(toDate, { target: { value: '2024-10-31' } });
            
            fireEvent.click(submitButton[0]);

            expect(submitButton[0]).toBeInTheDocument();
            expect(reportType).toBeInTheDocument();
            expect(FromDate).toBeInTheDocument();
            expect(toDate).toBeInTheDocument();

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/reports`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reportType: 'Total Summary',
                        startDate: '2024-10-01',
                        endDate: '2024-10-31',
                    }),
                });
                expect(window.alert).toHaveBeenCalledWith('User not found');
            });
        
            
        });
        
        test('should alert No Report available when response status is 400 while generating the report', async () => {
            
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve('No Report available'),
                })
            ) as jest.Mock;
            
            renderMainPage();

            const reportType = screen.getByRole('combobox') as HTMLSelectElement;
            const FromDate = screen.getByPlaceholderText('From');
            const toDate = screen.getByPlaceholderText('To');
            const submitButton = screen.getAllByRole('button', {
                name: 'Generate'
            });

            fireEvent.change(reportType, { target: { value: 'Total Summary' } });
            fireEvent.change(FromDate, { target: { value: '2024-10-01' } });
            fireEvent.change(toDate, { target: { value: '2024-10-31' } });
            
            fireEvent.click(submitButton[0]);

            expect(submitButton[0]).toBeInTheDocument();
            expect(reportType).toBeInTheDocument();
            expect(FromDate).toBeInTheDocument();
            expect(toDate).toBeInTheDocument();

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/reports`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reportType: 'Total Summary',
                        startDate: '2024-10-01',
                        endDate: '2024-10-31',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith('No Report available');
            });
        });

        test('should set report data, report type, total income, total expenses, and show report when response status is 200', async () => {

            const mockReportData = {
                summary: {
                    "Groceries": 5000,
                    "Entertainment": 2000,
                },
                reportType: 'Total Summary',
                totalIncome: 2000,
                totalExpenses: 5000,
            };
        
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(mockReportData),
                })
            ) as jest.Mock

            renderMainPage();

            const reportType = screen.getByRole('combobox') as HTMLSelectElement;
            const FromDate = screen.getByPlaceholderText('From');
            const toDate = screen.getByPlaceholderText('To');
            const submitButton = screen.getAllByRole('button', {
                name: 'Generate'
            });
        
            fireEvent.change(reportType, { target: { value: 'Total Summary' } });
            fireEvent.change(FromDate, { target: { value: '2024-10-01' } });
            fireEvent.change(toDate, { target: { value: '2024-10-31' } });
            
            fireEvent.click(submitButton[0]);

            const mockConsole = jest.spyOn(console, "log").mockImplementation(() => {})

            expect(submitButton[0]).toBeInTheDocument();
            expect(reportType).toBeInTheDocument();
            expect(FromDate).toBeInTheDocument();
            expect(toDate).toBeInTheDocument();

            expect(fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reportType: 'Total Summary',
                    startDate: '2024-10-01',
                    endDate: '2024-10-31',
                }),
            });

            await waitFor(async() => {
                expect(mockConsole).toHaveBeenCalledWith(mockReportData.summary);
            });
        }); 
    });

    describe('Tests related to the making the transaction', () => {

        test('should call fetchTxns and should alert with success message when transaction is successful', async () => {
              
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 200,
                    text: () => Promise.resolve('Transaction successful'),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'budget' } });
            fireEvent.change(nameInput, { target: { value: 'Groceries' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'budget',
                        name: 'Groceries',
                        amount: 100,
                        description: 'Bought groceries',
                        date: '2024-10-22',
                    }),
                });
                
                expect(mockContextData.fetchTxns).toHaveBeenCalled();
                expect(window.alert).toHaveBeenCalledWith('Transaction successful');
            });
            
        });
        
        test('should alert user not found if adding transaction without user', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 404,
                    text: () => Promise.resolve('User Not Found'),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'budget' } });
            fireEvent.change(nameInput, { target: { value: 'Groceries' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'budget',
                        name: 'Groceries',
                        amount: 100,
                        description: 'Bought groceries',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith('User Not Found');
            });

        });

        test('should alert Insufficient balance if adding transaction with exceedings the amount', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve('Insufficent balance in your account'),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'budget' } });
            fireEvent.change(nameInput, { target: { value: 'Groceries' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'budget',
                        name: 'Groceries',
                        amount: 100,
                        description: 'Bought groceries',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith('Insufficent balance in your account');
            });

        });

        test('should alert the No budgets associated with user', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve(`No Budgets associated with ${mockContextData.username}`),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'budget' } });
            fireEvent.change(nameInput, { target: { value: 'Groceries' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'budget',
                        name: 'Groceries',
                        amount: 100,
                        description: 'Bought groceries',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith(`No Budgets associated with ${mockContextData.username}`);
            });

        });  
        
        test('should alert the No goals associated with user', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve(`No Saving Goals associated with ${mockContextData.username}`),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'savinggoal' } });
            fireEvent.change(nameInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'vacation savings' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'savinggoal',
                        name: 'Vacation',
                        amount: 100,
                        description: 'vacation savings',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith(`No Saving Goals associated with ${mockContextData.username}`);
            });

        }); 

        test('should alert the Budget Not Found', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve(`Budget Not Found`),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'budget' } });
            fireEvent.change(nameInput, { target: { value: 'Groceries' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'Bought groceries' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'budget',
                        name: 'Groceries',
                        amount: 100,
                        description: 'Bought groceries',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith(`Budget Not Found`);
            });

        });

        test('should alert the Saving Goal Not Found', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve(`Saving Goal Not Found`),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'savinggoal' } });
            fireEvent.change(nameInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'vacation savings' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'savinggoal',
                        name: 'Vacation',
                        amount: 100,
                        description: 'vacation savings',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith(`Saving Goal Not Found`);
            });

        }); 

        test('should alert Exceeding the amount for the budget', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve(`Exceeding the amount`),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'budget' } });
            fireEvent.change(nameInput, { target: { value: 'Medical' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'Doctor appointment' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'budget',
                        name: 'Medical',
                        amount: 100,
                        description: 'Doctor appointment',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith(`Exceeding the amount`);
            });

        }); 

        test('should give the alert for saving more than the target amount', async() => {

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve(`You have saving more than the target amount`),
                })
            ) as jest.Mock;

            renderMainPage();

            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'savinggoal' } });
            fireEvent.change(nameInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'vacation savings' } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txnCategory: 'savinggoal',
                        name: 'Vacation',
                        amount: 100,
                        description: 'vacation savings',
                        date: '2024-10-22',
                    }),
                });
    
                expect(window.alert).toHaveBeenCalledWith(`You have saving more than the target amount`);
            });

        }); 

        test('should alert Transaction failed and throw an error when there is a network issue', async () => {
            global.fetch = jest.fn(() =>
                Promise.reject(new Error('Some Network error'))
            ) as jest.Mock;
        
            console.error = jest.fn();

            renderMainPage();


            const txnCategoryInput = screen.getByPlaceholderText('On Category') as HTMLInputElement;
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
            const dateInput = screen.getByPlaceholderText('Date') as HTMLInputElement;
            const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /Add/i });

            fireEvent.change(txnCategoryInput, { target: { value: 'savinggoal' } });
            fireEvent.change(nameInput, { target: { value: 'Vacation' } });
            fireEvent.change(amountInput, { target: { value: '100' } });
            fireEvent.change(dateInput, { target: { value: '2024-10-22' } });
            fireEvent.change(descriptionInput, { target: { value: 'vacation savings' } });
        
            fireEvent.click(submitButton);

            expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/fingrow/${mockContextData.username}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    txnCategory: 'savinggoal',
                    name: 'Vacation',
                    amount: 100,
                    description: 'vacation savings',
                    date: '2024-10-22',
                }),
            });

            await waitFor(() => {
                expect(console.error).toHaveBeenCalledWith('There was a problem with the making transaction:', expect.any(Error));
                expect(window.alert).toHaveBeenCalledWith('Transaction failed');
            });
        });
        
    });

});