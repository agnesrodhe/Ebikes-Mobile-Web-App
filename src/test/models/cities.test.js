import citiesModel from '../../models/cities.js';



describe('getAllBikes', () => {
    it('tests the getAllCities function', async () => {
        // Arrange
        const expectedResult = [{ id: 1, name: 'New York' }, { id: 2, name: 'San Francisco' }];
        const mockFetchPromise = Promise.resolve({
          json: () => Promise.resolve(expectedResult),
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
      
        // Act
        const result = await citiesModel.getAllCities();
      
        // Assert
        expect(result).toEqual(expectedResult);
      });

      it('should return an array of parking zones in the specified city', async () => {
        const sampleCityId = '123';
        const sampleChargingStations = [
          { inCity: '123', name: 'Zone 1' },
          { inCity: '123', name: 'Zone 2' },
          { inCity: '456', name: 'Zone 3' },
        ];
    
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve(sampleChargingStations) }));
    
        const result = await citiesModel.getParkingZones(sampleCityId);
    
        expect(result).toEqual([
          { inCity: '123', name: 'Zone 1' },
          { inCity: '123', name: 'Zone 2' },
        ]);
      });
});