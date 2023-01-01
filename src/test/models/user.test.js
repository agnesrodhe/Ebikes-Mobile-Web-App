import userModel from '../../models/user.js';

describe('User', () => {
    it('getUser should return user', async () => {
        const userId = '123';
        const fakeUserData = {
          name: 'John Smith',
          email: 'john@example.com'
        };
  
        // Mock the fetch function using mockImplementation
        jest.spyOn(global, 'fetch').mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeUserData)
          })
        );
  
        // Call the getPriceList function and store the result in a variable
        const result = await userModel.getUser(userId);
  
        // Assert that the result matches the expected value
        expect(result).toEqual(fakeUserData);
    });

    it('should send a POST request to the /v1/user/signin endpoint with the specified user object in the body and return the result', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            })
        );

        const userId = '123';
        const fakeUserData = {
          name: 'John Smith',
          email: 'john@example.com'
        };
        const result = await userModel.updateUser(userId, fakeUserData);

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:3002/v1/user/${userId}`,
            {
            method: 'PUT',
            body: JSON.stringify(fakeUserData),
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            }
        );
        expect(result).toEqual({ success: true });
    });
});