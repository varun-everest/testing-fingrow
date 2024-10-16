import { render, screen } from '@testing-library/react'
import Homepage from "./Homepage"

describe('Tests related to Homepage Component', () => {

    test("should renders the welcome heading title", () => {
        render(<Homepage />);
    
        const welcomeText = screen.getByText(/Welcome to FinGrow Finance Tracker Application/i);
        expect(welcomeText).toBeInTheDocument();
    });

    test("should renders the login button", () => {
        render(<Homepage />);

        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });
        expect(loginButton).toBeInTheDocument();
    });

    test("should renders the Register button", () => {
        render(<Homepage />);

        const registerButton = screen.getByRole('button', {
            name: 'Register'
        });
        expect(registerButton).toBeInTheDocument();
    });

})


