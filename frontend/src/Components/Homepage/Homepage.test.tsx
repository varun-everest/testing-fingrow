import { render, screen } from '@testing-library/react'
import Homepage from "./Homepage"

describe('Tests related to Homepage Component', () => {

    test("should renders the welcome heading title", () => {
        render(<Homepage />);
    
        const welcomeText = screen.getByText(/Welcome to FinGrow Finance Tracker Application/i);
        expect(welcomeText).toBeInTheDocument();
    });
    
})


