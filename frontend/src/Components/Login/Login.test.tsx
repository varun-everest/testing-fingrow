import {render, screen} from '@testing-library/react'
import Login from "./Login";

describe('Tests related to Login component', () => {
    
    test('should renders the Login heading', () => {
        render(<Login />);

        const login = screen.getByText('Login!')
        expect(login).toBeInTheDocument();
    });

    test('should renders the username field', () => {
        render(<Login />)

        const usernameElement = screen.getByLabelText(/username/i);
        expect(usernameElement).toBeInTheDocument();
        expect(usernameElement).toHaveAttribute('required');
    });

    test('should renders the password field', () => {
        render(<Login />)

        const passwordElement = screen.getByLabelText(/password/i);
        expect(passwordElement).toBeInTheDocument();
        expect(passwordElement).toHaveAttribute('required');
    });

    test('should renders the Login button', () => {
        render(<Login />)

        const LoginButton = screen.getByRole("button", {
            name: 'Login'
        });
        expect(LoginButton).toBeInTheDocument();
    });

    test("should renders the Dont't you have an account text and Register here text", () => {
        render(<Login />)

        const textElement = screen.getByText('Don\'t you have an account ?');
        const loginTextElement = screen.getByText('Register here');

        expect(textElement).toBeInTheDocument();
        expect(loginTextElement).toBeInTheDocument();
    });

});