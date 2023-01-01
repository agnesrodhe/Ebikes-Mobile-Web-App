import { getDistance } from 'geolib';
import functionsModel from '../../../tabs/mytrip/functions/functionsmodel.js';

describe('functionsModel', () => {
  test('costDuration calculates correct cost based on start time and minute tax', () => {
    var d = new Date();

    d.setHours(d.getHours() - 1);

    const startTime = d;
    const minutetaxa = 60;
    expect(functionsModel.costDuration(startTime, minutetaxa)).toBe("3600.00");
  });

  test('endCost calculates correct total cost, including start fee, penalty fee, and bonus', () => {
    var d = new Date();

    d.setHours(d.getHours() - 1);

    const trip = {
      startTime: d,
      startInParkingZone: true,
      stopInParkingZone: true
    };
    const priceList = {
      startfee: 100,
      minutetaxa: 60,
      penaltyfee: 200,
      bonus: 50
    };
    const expectedResult = {
      totalCost: 3650,
      minuteCost: 3600,
      startFee: 100,
      penaltyFee: 0,
      bonus: -50
    };
    expect(functionsModel.endCost(trip, priceList)).toEqual(expectedResult);
  });

  test('durationTime calculates correct duration in minutes and seconds', () => {
    var d = new Date();

    d.setHours(d.getHours() - 1);
    const startTime = d;
    const expectedResult = {
      minutes: "60",
      seconds: '0'
    };
    expect(functionsModel.durationTime(startTime)).toEqual(expectedResult);
  });

  test('endCost returns right result', () => {
    var d = new Date();

    d.setHours(d.getHours() - 1);
    const trip = { startTime: d, startInParkingZone: false, stopInParkingZone: false };
    const priceList = { startfee: 10, minutetaxa: 2, penaltyfee: 10 };
    const expectedResult = {
      totalCost: 140,
      minuteCost: 120,
      startFee: 10,
      penaltyFee: 10,
      bonus: -0
    };
    const result = functionsModel.endCost(trip, priceList);
    expect(result).toEqual(expectedResult);
  });

  it('should return the correct duration for the trip', () => {
    var d = new Date();

    d.setHours(d.getHours() - 1);
    const trip = {
      userId: 1,
      bikeId: 1,
      startTime: d,
      startPosition: { lat: 0, lng: 0 },
      startInParkingZone: false,
      city: {name: "Borlänge"}
  };
    const priceList = {};
    const userId = 1;

    const result = functionsModel.tripInfo(trip, priceList, userId);
    expect(result.bikeHistory.duration).toEqual({ minutes: "60", seconds: "0" });
    expect(result.userHistory.duration).toEqual({ minutes: "60", seconds: "0" });
  });
});