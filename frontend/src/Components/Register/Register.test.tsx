import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Register from "./Register"
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';


let mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate, 
}));

describe('Tests related to Register component', () => {


    beforeAll(() => {

    });

    beforeEach(() => {
        window.alert = jest.fn();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('should renders the Register heading', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const register = screen.getByText('Register!')
        expect(register).toBeInTheDocument()
    })

    test('should renders the username field', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const usernameElement = screen.getByLabelText(/username/i);
        expect(usernameElement).toBeInTheDocument();
        expect(usernameElement).toHaveAttribute('required');
    });

    test('should renders the password field', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const passwordElement = screen.getByLabelText(/password/i);
        expect(passwordElement).toBeInTheDocument();
        expect(passwordElement).toHaveAttribute('required');
    });

    test('should renders the total income field', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const totalIncomeElement = screen.getByLabelText(/total income/i);
        expect(totalIncomeElement).toBeInTheDocument();
        expect(totalIncomeElement).toHaveAttribute('required');
    });

    test('should renders the register button', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        expect(registerButton).toBeInTheDocument();
    });

    test('should renders the already have an account text and login here text', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const textElement = screen.getByText('Already have an account ?');
        const loginTextElement = screen.getByText('Login here');

        expect(textElement).toBeInTheDocument();
        expect(loginTextElement).toBeInTheDocument();
    });

    test('should navigate to the Login component when login link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/register']}> 
                <Register />
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        const loginLink = screen.getByText('Login here');
        fireEvent.click(loginLink);

        const loginHeading = screen.getByText('Login!'); 
        expect(loginHeading).toBeInTheDocument();
    });

    test('should check for correct input values', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Varun@765' } });
        fireEvent.change(screen.getByLabelText(/Total Income/i), { target: { value: '100000' } });

        expect((screen.getByLabelText(/Username/i) as HTMLInputElement).value).toBe('varun');
        expect((screen.getByLabelText(/Password/i) as HTMLInputElement).value).toBe('Varun@765');
        expect((screen.getByLabelText(/Total Income/i) as HTMLInputElement).value).toBe('100000');
    });

    test('should renders the alert when the fields are empty', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        fireEvent.click(registerButton);
        expect(window.alert).toHaveBeenCalledWith('All fields are required!!');
    });

    test('should show alert for existing username', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
    
       
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 400,
                json: () => Promise.resolve({ message: 'Username already taken, Choose another one' }),
            })
        ) as jest.Mock;
    
        
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        fireEvent.change(screen.getByLabelText(/total income/i), { target: { value: '50000' } });
    
        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        fireEvent.click(registerButton);

        await screen.findByRole('button'); 
        expect(window.alert).toHaveBeenCalledWith('Username already taken, Choose another one');

    });

    test('should show alert for successful registration and navigate to login page', async () => {
        
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
    
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 201,
                json: () => Promise.resolve({ message: 'Registration Successfull' }),
            })
        ) as jest.Mock;
    
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Varun@123' } });
        fireEvent.change(screen.getByLabelText(/total income/i), { target: { value: '100000' } });
 
        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        fireEvent.click(registerButton);
    
        const mockConsoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await screen.findByRole('button'); 
        
        expect(mockConsoleSpy).toHaveBeenCalledWith('Registration Successfull');
    
        expect(fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'varun',
                password: 'Varun@123',
                totalIncome: 100000
            }),
        });
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        })
        
    });
    
    test('should consoles successful registration and navigate to login page', async () => {
        
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
    
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 500,
                json: () => Promise.resolve({ message: 'Registration Successfull' }),
            })
        ) as jest.Mock;
    
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Varun@123' } });
        fireEvent.change(screen.getByLabelText(/total income/i), { target: { value: '100000' } });
 
        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        fireEvent.click(registerButton);
    
        const mockConsoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        
        await screen.findByRole('button'); 
        
        expect(window.alert).toHaveBeenCalledWith('Registration failed!!');
    
        expect(fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'varun',
                password: 'Varun@123',
                totalIncome: 100000
            }),
        });
    });

    test('should show alert when registration fails (catch block)', async () => {
       
        global.fetch = jest.fn(() => Promise.reject('Network error')) as jest.Mock;

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Varun@123' } });
        fireEvent.change(screen.getByLabelText(/total income/i), { target: { value: '100000' } });

        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        fireEvent.click(registerButton);

        await screen.findByRole('button'); 
        expect(window.alert).toHaveBeenCalledWith('Registration failed');
    });

})