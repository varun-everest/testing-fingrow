import { fireEvent, render, screen } from '@testing-library/react'
import Register from "./Register"
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';


describe('Tests related to Register component', () => {

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
})