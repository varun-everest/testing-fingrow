import { render, screen, fireEvent } from '@testing-library/react'
import Homepage from "./Homepage";
import { MemoryRouter, Routes, Route} from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

describe('Tests related to Homepage Component', () => {

    test("should renders the welcome heading title", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )
    
        const welcomeText = screen.getByText(/Welcome to FinGrow Finance Tracker Application/i);
        expect(welcomeText).toBeInTheDocument();
    });

    test("should renders the login button", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )

        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });
        expect(loginButton).toBeInTheDocument();
    });

    test("should renders the Register button", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )

        const registerButton = screen.getByRole('button', {
            name: 'Register'
        });
        expect(registerButton).toBeInTheDocument();
    });

    test("should renders the welcome heading title", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )
    
        const tagline = screen.getByRole("heading", {level:3});
        expect(tagline).toBeInTheDocument();
    });

    test('should navigate to login component when login button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Homepage />
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });
        fireEvent.click(loginButton);

        const loginHeading = screen.getByText('Login!');
        expect(loginHeading).toBeInTheDocument();
    });

    test('should navigate to register component when register button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Homepage />
                <Routes>
                    <Route path='/register' element={<Register />} />
                </Routes>
            </MemoryRouter>
        );

        const registerButton = screen.getByRole('button', {
            name: 'Register'
        });
        fireEvent.click(registerButton);

        const registerHeading = screen.getByText('Register!');
        expect(registerHeading).toBeInTheDocument();
    })
})


