import { render, screen } from '@testing-library/react';
import Index from '../../login/index.js';

test('Should display start screen', () => {
    render(<Index test={"start"} />);
    const loginButton = screen.getAllByRole("button", { name: /Logga in/i })
    expect(loginButton[0]).toBeInTheDocument();
});

test('Should display start login screen', () => {
    render(<Index test={"login"} />);
    const userField = screen.getByRole("textbox", { type: /email/i })
    const passwordField = screen.getByRole("textbox", { type: /password/i })
    expect(userField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
});

test('Should display register screen', () => {
    render(<Index test={"register"} />);
    const userField = screen.getAllByRole("textbox", { type: /text/i })
    const passwordField = screen.getAllByRole("textbox", { type: /password/i })
    expect(userField[0]).toBeInTheDocument();
    expect(userField[1]).toBeInTheDocument();
    expect(userField[2]).toBeInTheDocument();
    expect(passwordField[0]).toBeInTheDocument();
});
