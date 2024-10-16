import { render, screen } from '@testing-library/react'
import Register from "./Register"


describe('Tests related to Register component', () => {

    test('should renders the Register heading', () => {
        render(<Register />);

        const register = screen.getByText('Register!')
        expect(register).toBeInTheDocument()
    })

    test('should renders the username field', () => {
        render(<Register />)

        const usernameElement = screen.getByLabelText(/username/i);
        expect(usernameElement).toBeInTheDocument();
        expect(usernameElement).toHaveAttribute('required');
    });

    test('should renders the password field', () => {
        render(<Register />)

        const passwordElement = screen.getByLabelText(/password/i);
        expect(passwordElement).toBeInTheDocument();
        expect(passwordElement).toHaveAttribute('required');
    });

    test('should renders the total income field', () => {
        render(<Register />)

        const totalIncomeElement = screen.getByLabelText(/total income/i);
        expect(totalIncomeElement).toBeInTheDocument();
        expect(totalIncomeElement).toHaveAttribute('required');
    });

    test('should renders the register button', () => {
        render(<Register />)

        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        expect(registerButton).toBeInTheDocument();
    });

    test('should renders the already have an account text and login here text', () => {
        render(<Register />)

        const textElement = screen.getByText('Already have an account ?');
        const loginTextElement = screen.getByText('Login here');

        expect(textElement).toBeInTheDocument();
        expect(loginTextElement).toBeInTheDocument();
    })
})