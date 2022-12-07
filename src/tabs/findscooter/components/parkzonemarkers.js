import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import parking from "../../../assets/parking.png";

function ParkZoneMarkers({ parkingZones }) {
    const allZonesMaped = parkingZones.map((zone, index) => {
        return <MarkerF
            key={index}
            icon={parking}
            position={{
                lat: zone.location.coordinates[1],
                lng: zone.location.coordinates[0]
            }}
        />;
    });

    return allZonesMaped;
}

export default ParkZoneMarkers;
