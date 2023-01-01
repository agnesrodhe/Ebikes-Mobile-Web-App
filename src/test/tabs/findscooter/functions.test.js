import { getDistance } from 'geolib';
import functionsModel from '../../../tabs/findscooter/functions/functionsmodel.js';

describe('functionsModel', () => {
  test('getDistance returns true when bike is within 100 meters of parking zone', () => {
    const bike = {
      location: {
        coordinates: [12.35, 56.79]
      }
    };
    const parkingZones = [{
      location: {
        coordinates: [12.35, 56.79]
      }
    }];
    expect(functionsModel.getDistance(bike, parkingZones)).toBe(true);
  });

  test('getDistance returns false when bike is more than 100 meters away from parking zone', () => {
    const bike = {
      location: {
        coordinates: [12.34, 56.78]
      }
    };
    const parkingZones = [{
      location: {
        coordinates: [12.36, 56.79]
      }
    }];
    expect(functionsModel.getDistance(bike, parkingZones)).toBe(false);
  });

  test('getDistance handles empty parking zones array', () => {
    const bike = {
      location: {
        coordinates: [12.34, 56.78]
      }
    };
    const parkingZones = [];
    expect(functionsModel.getDistance(bike, parkingZones)).toBe(false);
  });
});