import { render, screen } from '@testing-library/react'
import Register from "./Register"


describe('Tests related to Register component', () => {

    test('should renders the username field', () => {
        render(<Register />)

        const usernameElement = screen.getByLabelText(/username/i);
        expect(usernameElement).toBeInTheDocument();
    });

    test('should renders the password field', () => {
        render(<Register />)

        const passwordElement = screen.getByLabelText(/password/i);
        expect(passwordElement).toBeInTheDocument();
    });

    test('should renders the total income field', () => {
        render(<Register />)

        const totalIncomeElement = screen.getByLabelText(/total income/i);
        expect(totalIncomeElement).toBeInTheDocument();
    });

    test('should renders the register button', () => {
        render(<Register />)

        const registerButton = screen.getByRole("button", {
            name: 'Register'
        });
        expect(registerButton).toBeInTheDocument();
    });
})