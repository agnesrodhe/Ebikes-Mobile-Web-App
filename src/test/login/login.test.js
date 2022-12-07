import { render, screen } from '@testing-library/react';
import Login from '../../login/login.js';
import App from '../../App.js';

test('Login button exists', () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /Logga in/i })
    expect(loginButton).toBeInTheDocument();
});

test('Login title', () => {
    render(<Login />);
    const logintitle = screen.getAllByRole("heading", { name: /Logga in/i })
    expect(logintitle[0]).toBeInTheDocument();
});

test('Username and password fields should exist', () => {
    render(<Login />);
    const userField = screen.getByRole("textbox", { type: /email/i })
    const passwordField = screen.getByRole("textbox", { type: /password/i })
    expect(userField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
});
