import bikesModel from '../../models/bikes.js';

describe('getAllBikes', () => {
    it('should send a GET request to the /v1/bikes endpoint and return the correct data', async () => {
      // Create a mock for the fetch function
      const fetchMock = jest.fn();
      window.fetch = fetchMock;
  
      // Set up the mock response
      const mockResponse = {
        json: () => Promise.resolve({ success: true, data: [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }] }),
      };
      fetchMock.mockImplementation(() => Promise.resolve(mockResponse));
  
      // Call the getAllBikes function
      const result = await bikesModel.getAllBikes();
  
      // Assert that the correct request was made
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3002/v1/bikes',
        {
          credentials: 'include',
        },
      );
  
      // Assert that the correct data was returned
      expect(result).toEqual({ success: true, data: [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }] });
    });
  
    it('should return an error if the request fails', async () => {
      // Create a mock for the fetch function
      const fetchMock = jest.fn();
      window.fetch = fetchMock;
  
      // Set up the mock response
      const mockError = new Error('Request failed');
      fetchMock.mockImplementation(() => Promise.reject(mockError));
  
      // Call the getAllBikes function
      try {
        await bikesModel.getAllBikes();
      } catch (error) {
        // Assert that the error is returned
        expect(error).toEqual(mockError);
      }
    });
});

describe('getAllBikesInCity', () => {
    it('should send a GET request to the /v1/bikes/city/:cityId/nonactive endpoint and return the correct data', async () => {
      // Create a mock for the fetch function
      const fetchMock = jest.fn();
      window.fetch = fetchMock;
  
      // Set up the mock response
      const mockResponse = {
        json: () => Promise.resolve({ success: true, data: [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }] }),
      };
      fetchMock.mockImplementation(() => Promise.resolve(mockResponse));
  
      // Call the getAllBikesInCity function
      const result = await bikesModel.getAllBikesInCity(1);
  
      // Assert that the correct request was made
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3002/v1/bikes/city/1/nonactive',
        {
          credentials: 'include',
        },
      );
  
      // Assert that the correct data was returned
      expect(result).toEqual({ success: true, data: [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }] });
    });
  
    it('should return an error if the request fails', async () => {
      // Create a mock for the fetch function
      const fetchMock = jest.fn();
      window.fetch = fetchMock;
  
      // Set up the mock response
      const mockError = new Error('Request failed');
      fetchMock.mockImplementation(() => Promise.reject(mockError));
  
      // Call the getAllBikesInCity function
      try {
        await bikesModel.getAllBikesInCity(1);
      } catch (error) {
        // Assert that the error is returned
        expect(error).toEqual(mockError);
      }
    });
});

describe('getOneBike', () => {
    it('should send a GET request to the /v1/bikes/:bikeId endpoint and return the correct data', async () => {
      // Create a mock for the fetch function
      const fetchMock = jest.fn();
      window.fetch = fetchMock;
  
      // Set up the mock response
      const mockResponse = {
        json: () => Promise.resolve({ success: true, data: { id: 1, name: 'Bike 1' } }),
      };
      fetchMock.mockImplementation(() => Promise.resolve(mockResponse));
  
      // Call the getOneBike function
      const result = await bikesModel.getOneBike(1);
  
      // Assert that the correct request was made
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3002/v1/bikes/1',
        {
          credentials: 'include',
        },
      );
  
      // Assert that the correct data was returned
      expect(result).toEqual({ success: true, data: { id: 1, name: 'Bike 1' } });
    });

    it('should return an error if the request fails', async () => {
        // Create a mock for the fetch function
        const fetchMock = jest.fn();
        window.fetch = fetchMock;
    
        // Set up the mock response
        const mockError = new Error('Request failed');
        fetchMock.mockImplementation(() => Promise.reject(mockError));
    
        // Call the getAllBikesInCity function
        try {
          await bikesModel.getAllBikesInCity(1);
        } catch (error) {
          // Assert that the error is returned
          expect(error).toEqual(mockError);
        }
    });
});

describe('updateBike', () => {
    it('should send a PUT request to the /v1/bikes/:bikeId endpoint with the correct data and return the response', async () => {
      // Create a mock for the fetch function
      const fetchMock = jest.fn();
      window.fetch = fetchMock;
  
      // Set up the mock response
      const mockResponse = {
        json: () => Promise.resolve({ success: true, data: { id: 1, name: 'Updated Bike' } }),
      };
      fetchMock.mockImplementation(() => Promise.resolve(mockResponse));
  
      // Call the updateBike function
      const result = await bikesModel.updateBike(1, { name: 'Updated Bike' });
  
      // Assert that the correct request was made
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3002/v1/bikes/1',
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ name: 'Updated Bike' }),
        },
      );
  
      // Assert that the correct data was returned
      expect(result).toEqual({ success: true, data: { id: 1, name: 'Updated Bike' } });
    });

    
    it('should return an error if the request fails', async () => {
        // Create a mock for the fetch function
        const fetchMock = jest.fn();
        window.fetch = fetchMock;
    
        // Set up the mock response
        const mockError = new Error('Request failed');
        fetchMock.mockImplementation(() => Promise.reject(mockError));
    
        // Call the getAllBikesInCity function
        try {
          await bikesModel.getAllBikesInCity(1);
        } catch (error) {
          // Assert that the error is returned
          expect(error).toEqual(mockError);
        }
    });
});