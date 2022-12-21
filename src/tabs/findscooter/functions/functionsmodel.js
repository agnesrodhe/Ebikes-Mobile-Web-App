// Findscooter functions
import { getDistance } from 'geolib';

const functionsModel = {
    getDistance: function GetDistance(bike, parkingZones) {
        // If in parkingzone
        let inParkingZone = false;

        parkingZones.forEach(zone => {
            const distance = getDistance(
                bike.location.coordinates,
                {
                    latitude: zone.location.coordinates[1],
                    longitude: zone.location.coordinates[0]
                }
            );

            // If bike is within 100 meters of parkingzone center
            if (distance <= 100) {
                inParkingZone = true;
            }
        });

        return inParkingZone;
    }
};

export default functionsModel;
