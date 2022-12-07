import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import scooter from "../../../assets/scooter.png";

function ParkingMarkers({ parkingZones }) {
    const allBikedMaped = bikes.map((bike, index) => {
        return <MarkerF
            key={index}
            icon={scooter}
            position={{
                lat: bike.location.coordinates[1],
                lng: bike.location.coordinates[0]
            }}
            onClick={() => {setSelectedBike(bike);}}
        />;
    });

    return allBikedMaped;
}

export default ParkingMarkers;
