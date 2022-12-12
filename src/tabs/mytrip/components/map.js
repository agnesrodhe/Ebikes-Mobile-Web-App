import React, { useEffect, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import scooter from "../../../assets/scooter.png";
import parking from "../../../assets/parking.png";
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

import { GoogleMap, useLoadScript, PolygonF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '5px'
};

const libraries = ["places"];

const baseURL = 'http://localhost:3002/v1/bikes/events/event/';

function Map({ trip }) {
    const [bike, setBike] = useState();
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        if ('EventSource' in window) {
            const source = new EventSource(
                `${baseURL}${trip.city._id}/${trip.bikeId}`, {withCredentials: true}
            );

            source.addEventListener('ping', e => {
                console.log(e);
                setBike(JSON.parse(e.data));
            });
            source.addEventListener('open', function() {
                console.log("connected");
            }, false);
            source.addEventListener('error', function() {
                console.log("error");
            }, false);
            return () => {
                source.close();
            };
        }
        // eslint-disable-next-line
    }, [bike]);

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
                center={{lat: trip.startPosition[1], lng: trip.startPosition[0]}}
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

                {bike &&
                    <MarkerF
                        icon={scooter}
                        position={{
                            lat: bike.location.coordinates[1],
                            lng: bike.location.coordinates[0]
                        }}
                    />
                }

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
