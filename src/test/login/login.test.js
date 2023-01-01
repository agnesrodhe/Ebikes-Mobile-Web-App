import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../login/login.js';

describe('Login component', () => {
    const setDisplay = jest.fn();
    const setUser = jest.fn();
  
    beforeEach(() => {
      render(<Login setDisplay={setDisplay} setUser={setUser} />);
    });

    test('Login button exists', () => {
        const loginButton = screen.getByRole("button", { name: /Logga in/i })
        expect(loginButton).toBeInTheDocument();
    });

    test('Login title', () => {
        const logintitle = screen.getAllByRole("heading", { name: /Logga in/i })
        expect(logintitle[0]).toBeInTheDocument();
    });

    test('Username and password fields should exist', () => {
        const userField = screen.getByRole("textbox", { type: /email/i })
        const passwordField = screen.getByRole("textbox", { type: /password/i })
        expect(userField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
    });

    test('displays error message when login button is clicked with empty fields', () => {
        const loginButton = screen.getByRole("button", { name: /Logga in/i });
        fireEvent.click(loginButton);
        expect(screen.getByTestId('error')).toHaveTextContent('Fyll i alla fält!');
    });
});