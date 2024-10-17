import {render, screen, fireEvent} from '@testing-library/react'
import Login from "./Login";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';

describe('Tests related to Login component', () => {

    beforeAll(() => {
        window.alert = jest.fn();
    })
    
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

});