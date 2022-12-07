// MyTrip functions

const functionsModel = {
    cost: function Cost(trip, priceList) {
        const startFee = priceList.startFee;
        const secondTaxa = priceList.minuteTaxa / 60;

        const totalSeconds = Math.floor(
            ( Math.abs(new Date(trip.startTime).getTime() - new Date().getTime()) / 1000 )
        );
        const cost = (startFee + (totalSeconds * secondTaxa)).toFixed(2);

        return cost;
    },

    durationTime: function durationTime(trip) {
        const time = Math.abs(new Date(trip.startTime).getTime() - new Date().getTime()) / 1000;
        const minutes = String(Math.floor(time / 60));
        const seconds = (time - minutes * 60).toFixed(0);

        return {
            minutes: minutes,
            seconds: seconds
        };
    },

    tripInfo: function TripInfo(trip, priceList, user) {
        const durationTrip = functionsModel.durationTime(trip);
        const costTrip = functionsModel.cost(trip, priceList);

        // bike history
        const tripBike = {
            userId: user._id,
            startTime: trip.startTime,
            stopTime: new Date(),
            startPosition: trip.startPosition,
            stopPosition: trip.startPosition,
            duration: {
                minutes: durationTrip.minutes,
                seconds: durationTrip.seconds
            },
            cost: costTrip
        };

        // user history
        const tripUser = {
            bikeId: trip.bikeId,
            city: trip.city.name,
            startTime: trip.startTime,
            stopTime: new Date(),
            startPosition: trip.startPosition,
            stopPosition: trip.startPosition,
            duration: {
                minutes: durationTrip.minutes,
                seconds: durationTrip.seconds
            },
            cost: costTrip
        };

        return {
            cost: costTrip,
            bikeHistory: tripBike,
            userHistory: tripUser
        };
    }
};

export default functionsModel;
