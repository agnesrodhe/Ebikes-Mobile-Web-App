import { render, screen } from '@testing-library/react';
import App from '../App.js';

const user = {
    "_id": "6389bbd554dc36eb434c062f",
    "username": "test",
    "firstName": "Anna",
    "lastName": "Berg",
    "password": "$2a$10$fGo9BdnCjY5mhmyqucw5k.dwQNa.B6akezM2q9fo5eeivB9cBzYmW",
    "role": "customer",
    "history": [],
    "__v": 0
};

//test('If not logged in, startscreen with login button should be displayed', () => {
//    render(<App test={null} />);
//    const LoginButton = screen.getAllByRole("button", { type: /Logga in/i })
//    expect(LoginButton[0]).toBeInTheDocument();
//});

test('If logged in, firstscreen with city buttons should be displayed', () => {
    render(<App test={user} />);
    const visbyButton = screen.getAllByRole("button", { type: /Visby/i })
    expect(visbyButton[0]).toBeInTheDocument();
});