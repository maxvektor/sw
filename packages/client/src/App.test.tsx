import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const header = screen.getByText(/STAR WARS MOVIES/i);
  expect(header).toBeInTheDocument();
});
