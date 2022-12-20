import React, { useEffect, useState } from 'react';
import bikesModel from '../../../models/bikes.js';
import citiesModel from '../../../models/cities.js';
import BikeMarkers from './bikemarkers.js';
import ParkZoneMarkers from './parkzonemarkers.js';
import ParkZoneCircles from './parkzonecircles.js';
import InfoWindow from './infowindow.js';
import functionsModel from '../functions/functionsmodel.js';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

import { GoogleMap, useLoadScript, PolygonF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '82%',
    position: 'absolute',
    bottom: 56
};

const libraries = ["places"];

function Map({ coordinates, user, setTab, city, priceList }) {
    const [startCoordinates] = useState(coordinates);
    const [cityZone, setCityZone] = useState("");
    const [bikes, setbikes] = useState("");
    const [parkingZones, setParkingZones] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [zoomLevel, setZoomLevel] = useState(10);

    useEffect(() => {
        (async () => {
            // Get all inactive bikes in city
            const allbikesInCurrentCity = await bikesModel.getAllBikesInCity(city._id);
            const parkingZonesInCity = await citiesModel.getParkingZones(city._id);

            setbikes(allbikesInCurrentCity);
            setParkingZones(parkingZonesInCity);

            // Set zoom level
            if (city.name === "Visby") {
                setZoomLevel(12);
            }
            if (city.name === "Borlänge") {
                setZoomLevel(12);
            }
            if (city.name === "Lund") {
                setZoomLevel(11);
            }

            // Set city borders
            let coordinatesArray = [];

            city.location.coordinates[0].forEach((value) => {
                coordinatesArray.push({
                    lat: parseFloat(value[1]),
                    lng: parseFloat(value[0])
                });
            });
            setCityZone(coordinatesArray);
        })();
    }, []);

    if (loadError) {
        return "Error loading maps";
    }

    if (!isLoaded) {
        return "Loading maps";
    }

    async function StartTrip() {
        await bikesModel.updateBike(selectedBike._id, {active: user._id});

        const inParkingZone = functionsModel.getDistance(selectedBike, parkingZones);

        const newTrip = {
            userId: user._id,
            bikeId: selectedBike._id,
            startTime: new Date(),
            startPosition: selectedBike.location.coordinates,
            startInParkingZone: inParkingZone,
            city: city,
            cityZone: cityZone,
            parkingZones: parkingZones
        };

        console.log(newTrip);

        localStorage.setItem('trip', JSON.stringify(newTrip));

        setTab(1);
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={startCoordinates}
                zoom={zoomLevel}
                options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                }}
            >
                <>
                    <PolygonF
                        path={cityZone}
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

                    {bikes && <BikeMarkers bikes={bikes} setSelectedBike={setSelectedBike} />}

                    {parkingZones && <ParkZoneMarkers parkingZones={parkingZones} />}
                    {parkingZones && <ParkZoneCircles parkingZones={parkingZones} />}

                    {selectedBike ? <InfoWindow
                        user={user}
                        selectedBike={selectedBike}
                        setSelectedBike={setSelectedBike}
                        parkingZones={parkingZones}
                        priceList={priceList}
                        setTab={setTab}
                        StartTrip={StartTrip}
                    /> : null}
                </>
            </GoogleMap>

        </div>
    );
}

export default Map;
