import { render, screen } from '@testing-library/react';
import Register from '../../login/register.js';

test('Login button exists', () => {
    render(<Register />);
    const createButton = screen.getByRole("button", { name: /Skapa/i })
    expect(createButton).toBeInTheDocument();
});

test('Username, password, firstname and lastname fields should exist', () => {
    render(<Register />);
    const userField = screen.getAllByRole("textbox", { type: /email/i })
    const passwordField = screen.getAllByRole("textbox", { type: /password/i })
    expect(userField[0]).toBeInTheDocument();
    expect(userField[1]).toBeInTheDocument();
    expect(userField[2]).toBeInTheDocument();
    expect(passwordField[0]).toBeInTheDocument();
});
