import priceModel from '../../models/prices.js';
import { mockImplementation } from 'jest';

test('getPriceList returns a list of prices', async () => {
    const mockResponse = {
      data: [
        { id: 1, price: 10 },
        { id: 2, price: 15 },
        { id: 3, price: 20 }
      ]
    };
  
    // Mock the fetch function using mockImplementation
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
  
    // Call the getPriceList function and store the result in a variable
    const result = await priceModel.getPriceList();
  
    // Assert that the result matches the expected value
    expect(result).toEqual(mockResponse);
  });