// MyTrip functions
import { getDistance } from 'geolib';

const functionsModel = {
    costDuration: function CostDuration(startTime, minutetaxa) {
        const secondTaxa = minutetaxa / 60;

        const totalSeconds = Math.floor(
            ( Math.abs(new Date(startTime).getTime() - new Date().getTime()) / 1000 )
        );
        const cost = (totalSeconds * secondTaxa).toFixed(2);

        return cost;
    },

    endCost: function EndCost(trip, priceList) {
        const minuteCost = functionsModel.costDuration(trip.startTime, priceList.minutetaxa);

        let totalCost = parseFloat(minuteCost) + parseInt(priceList.startfee);

        let penalty = 0;

        let bonus = 0;

        if (trip.startInParkingZone === true && trip.stopInParkingZone === true) {
            totalCost = totalCost - parseInt(priceList.bonus);
            bonus = parseInt(priceList.bonus);
        }

        if (trip.stopInParkingZone === false) {
            totalCost = totalCost + parseInt(priceList.penaltyfee);
            penalty = parseInt(priceList.penaltyfee);
        }

        return {
            totalCost: totalCost,
            minuteCost: parseFloat(minuteCost),
            startFee: priceList.startfee,
            penaltyFee: penalty,
            bonus: -1*bonus
        };
    },

    durationTime: function DurationTime(startTime) {
        const time = Math.abs(new Date(startTime).getTime() - new Date().getTime()) / 1000;
        const minutes = String(Math.floor(time / 60));
        const seconds = (time - minutes * 60).toFixed(0);

        return {
            minutes: minutes,
            seconds: seconds
        };
    },

    tripInfo: function TripInfo(trip, priceList, userId) {
        const durationTrip = functionsModel.durationTime(trip.startTime);
        const costTrip = functionsModel.endCost(trip, priceList);

        // bike history
        const tripBike = {
            userId: userId,
            startTime: trip.startTime,
            stopTime: new Date(),
            startPosition: trip.startPosition,
            stopPosition: trip.startPosition,
            duration: {
                minutes: durationTrip.minutes,
                seconds: durationTrip.seconds
            },
            cost: costTrip.totalCost
        };

        // user history
        const tripUser = {
            bikeid: trip.bikeId,
            city: trip.city.name,
            starttime: trip.startTime,
            stoptime: new Date(),
            startposition: trip.startPosition,
            stopposition: trip.startPosition,
            duration: {
                minutes: durationTrip.minutes,
                seconds: durationTrip.seconds
            },
            cost: {
                totalcost: costTrip.totalCost.toFixed(2),
                minutecost: costTrip.minuteCost.toFixed(2),
                startfee: costTrip.startFee,
                penaltyfee: costTrip.penaltyFee,
                bonus: costTrip.bonus
            }

        };

        return {
            cost: costTrip.totalCost.toFixed(2),
            bikeHistory: tripBike,
            userHistory: tripUser
        };
    },

    inParkingZone: function inParkingZone(trip, bike) {
        let parkedInParkingZone = false;

        trip.parkingZones.forEach(zone => {
            const distance = getDistance(
                bike.location.coordinates,
                {
                    latitude: zone.location.coordinates[1],
                    longitude: zone.location.coordinates[0]
                }
            );

            // If bike is within 700 meters of parkingzone center
            if (distance <= 700) {
                parkedInParkingZone = true;
            }
        });

        console.log(parkedInParkingZone);
    }
};

export default functionsModel;
