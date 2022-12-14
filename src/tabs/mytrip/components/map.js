import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import scooter from "../../../assets/scooter.png";
import parking from "../../../assets/parking.png";
import ParkZoneCircles from './parkzonecircles';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

import { GoogleMap, useLoadScript, PolygonF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '350px',
    borderRadius: '5px'
};

const libraries = ["places"];

function Map({ trip, bike }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) {
        return "Error loading maps";
    }

    if (!isLoaded) {
        return "Loading maps";
    }

    return (
        <div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{lat: bike.location.coordinates[1], lng: bike.location.coordinates[0]}}
                zoom={15}
                options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                }}
            >
                <PolygonF
                    path={trip.cityZone}
                    options={{
                        fillOpacity: 0,
                        strokeColor: "black",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        clickable: false,
                        draggable: false,
                        editable: false,
                        geodesic: false,
                        zIndex: 1
                    }}
                />

                <MarkerF
                    icon={scooter}
                    position={{
                        lat: bike.location.coordinates[1],
                        lng: bike.location.coordinates[0]
                    }}
                />

                <ParkZoneCircles parkingZones={trip.parkingZones} />

                {trip.parkingZones.map((zone, index) => {
                    return <MarkerF
                        key={index}
                        icon={parking}
                        position={{
                            lat: zone.location.coordinates[1],
                            lng: zone.location.coordinates[0]
                        }}
                    />;
                })}
            </GoogleMap>
        </div>
    );
}

export default Map;
