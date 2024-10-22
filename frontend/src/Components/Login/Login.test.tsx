import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Login from "./Login";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';
import { DataContext } from '../../Context/Context';


let mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: () => mockNavigate, 
}));

describe('Tests related to Login component', () => {

    beforeEach(() => {
        window.alert = jest.fn();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    const mockData = {
        recentTxns: [],
        username: '',
        setUserName: jest.fn(),
        isLogin: false,
        setIsLogin: jest.fn(),
        setRecentTxns: jest.fn(),
        fetchTxns: jest.fn(),
    };

    const renderWithDataContext = () => {
        return render(
            <MemoryRouter>
                <DataContext.Provider value={mockData}>
                    <Login />
                </DataContext.Provider>
            </MemoryRouter>
        );
    };
    
    test('should renders the Login heading', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
            
        );

        const login = screen.getByText('Login!')
        expect(login).toBeInTheDocument();
    });

    test('should renders the username field', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const usernameElement = screen.getByLabelText(/username/i);
        expect(usernameElement).toBeInTheDocument();
        expect(usernameElement).toHaveAttribute('required');
    });

    test('should renders the password field', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const passwordElement = screen.getByLabelText(/password/i);
        expect(passwordElement).toBeInTheDocument();
        expect(passwordElement).toHaveAttribute('required');
    });

    test('should renders the Login button', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const LoginButton = screen.getByRole("button", {
            name: 'Login'
        });
        expect(LoginButton).toBeInTheDocument();
    });

    test("should renders the Dont't you have an account text and Register here text", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const textElement = screen.getByText('Don\'t you have an account ?');
        const loginTextElement = screen.getByText('Register here');

        expect(textElement).toBeInTheDocument();
        expect(loginTextElement).toBeInTheDocument();
    });

    test('should navigate to the Register component when Register link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/login']}> 
                <Login />
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
            </MemoryRouter>
        );

        const registerLink = screen.getByText('Register here');
        fireEvent.click(registerLink);

        const registerHeading = screen.getByText('Register!'); 
        expect(registerHeading).toBeInTheDocument();
    });

    test('should check for correct input values', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Varun@765' } });

        expect((screen.getByLabelText(/Username/i) as HTMLInputElement).value).toBe('varun');
        expect((screen.getByLabelText(/Password/i) as HTMLInputElement).value).toBe('Varun@765');
    });

    test('should renders the alert when the fields are empty', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const loginButton = screen.getByRole("button", {
            name: 'Login'
        });
        fireEvent.click(loginButton);
        expect(window.alert).toHaveBeenCalledWith('All fields are required!!');
    });

    test('should shows for successful login message and navigate to home page', async () => {
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ username: 'varun' }),
            })
        ) as jest.Mock;

        renderWithDataContext();

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'V@run765' } });

        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockData.setIsLogin).toHaveBeenCalledWith(true);
            expect(mockData.setUserName).toHaveBeenCalledWith('varun');
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });

    test('should show alert when username does not exist', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 404,
            })
        ) as jest.Mock;

        renderWithDataContext();

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Varu' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });


        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Not a valid username');
            expect(screen.getByLabelText(/username/i)).toHaveValue('');
            expect(screen.getByLabelText(/password/i)).toHaveValue('');
        });
    });

    test('should show alert for incorrect password', async () => {
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 401,
            })
        ) as jest.Mock;

        renderWithDataContext();

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345' } });

        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Incorrect password');
            expect(screen.getByLabelText(/password/i)).toHaveValue('');
        });
    });

    test('should show alert for login failed', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 500,
            })
        ) as jest.Mock;

        renderWithDataContext();

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Login failed!!');
        });
    });

    test('should show alert and give an error if there is any error occurred', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('some error occurred'))) as jest.Mock;

        renderWithDataContext();

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Login failed');
        });
    });
});