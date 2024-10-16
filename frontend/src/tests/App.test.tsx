import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello!!. This is react project/i);
  expect(linkElement).toBeInTheDocument();
});
