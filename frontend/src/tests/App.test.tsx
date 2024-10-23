import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { InitialEntry } from '@remix-run/router';

describe('Tests relate to the App Component', () => {

    const renderAppWithRouter = (initialEntries: InitialEntry[]) => {
      return render(
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      );
    };

    test('should renders Homepage component when navigating to /', () => {
        renderAppWithRouter(['/']); 
        expect(screen.getByText(/Welcome to FinGrow Finance Tracker Application/i)).toBeInTheDocument(); 
    });

    test('should renders Register component when navigating to /register', () => {
        renderAppWithRouter(['/register']);
        expect(screen.getByText(/Register!/i)).toBeInTheDocument(); 
    });

    test('should renders Login component when navigating to /login', () => {
        renderAppWithRouter(['/login']); 
        expect(screen.getByText(/Login!/i)).toBeInTheDocument(); 
    });

    test('should renders MainPage component when navigating to /home', () => {
        renderAppWithRouter(['/home']);
        expect(screen.getByText(/FinGrow Finance Tracker/i)).toBeInTheDocument(); 
    });
});
