import authModel from '../../models/auth.js';

describe('userModel', () => {
    describe('login', () => {
        it('should send a POST request to the /v1/user/signin endpoint with the specified user object in the body and return the result', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            })
        );

        const user = { username: 'test', password: 'password' };
        const result = await authModel.signIn(user);

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3002/v1/user/signin',
            {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            }
        );
        expect(result).toEqual({ success: true });
        });
    });

    describe('register', () => {
        it('should send a POST request to the /v1/user/signup endpoint with the specified user object in the body and return a success message if the registration was successful', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            })
        );

        const user = { username: 'test', password: 'password' };
        const result = await authModel.signUp(user);

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3002/v1/user/signup',
            {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            }
        );
        expect(result).toEqual({ success: true });
        });
    });
})