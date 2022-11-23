import { render, screen } from '@testing-library/react';
import Login from '../../login/login.js';

test('Login button exists', () => {
    render(<Login />);
    const createButton = screen.getAllByRole("button", { name: /Logga in/i })
    expect(createButton[0]).toBeInTheDocument();
});
