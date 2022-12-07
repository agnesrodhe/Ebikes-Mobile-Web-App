import { render, screen } from '@testing-library/react';
import Navigation from '../../tabnavigation/navigation.js';

const user = {
    "_id": "6389bbd554dc36eb434c062f",
    "username": "test",
    "firstName": "Vincent",
    "lastName": "Wistrand",
    "password": "$2a$10$fGo9BdnCjY5mhmyqucw5k.dwQNa.B6akezM2q9fo5eeivB9cBzYmW",
    "role": "customer",
    "history": [],
    "__v": 0
};

test('"Find scooter" tab should be displayed', () => {
    render(<Navigation test={0} user={user} />);
    const visbyButton = screen.getAllByRole("button", { type: /Visby/i })
    expect(visbyButton[0]).toBeInTheDocument();
});

test('If logged in, firstscreen with city buttons should be displayed', () => {
    render(<Navigation test={1} user={user} />);
    const inputNode1 = screen.getAllByRole("heading", { type: /Min resa/i })
    expect(inputNode1[0]).toBeInTheDocument();
});

test('If logged in, firstscreen with city buttons should be displayed', () => {
    render(<Navigation test={2} user={user} />);
    const logoutButton = screen.getAllByRole("button", { type: /Logga ut/i })
    expect(logoutButton[0]).toBeInTheDocument();
});
