import React, { useEffect, useState } from 'react';
import bikesModel from '../../../models/bikes.js';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '760px',
  position: 'absolute',
  bottom: 56
};

const libraries = ["places"];

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
};

function Map({ coordinates, setTab }) {
    const [startCoordinates] = useState(coordinates);
    const [bikes, setbikes] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        (async () => {
            const allbikes = await bikesModel.getAllBikes();
            setbikes(allbikes);
        })();
    }, [])

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    function StartTrip() {
        setTab(1);
    }

return (
    <div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={startCoordinates}
                zoom={12}
                options={defaultMapOptions}
            >
                <>
                {bikes && 
                    <>
                    {bikes.map((bike, index) => {
                        return <MarkerF 
                                    key={index} 
                                    position={{
                                        lat: bike.location.coordinates[1],
                                        lng: bike.location.coordinates[0]
                                    }}
                                    onClick={() => {setSelectedBike(bike)}}
                                />
                    })}
                    </>
                }

                {selectedBike ? <>
                    <InfoWindowF
                        position={{
                            lat: selectedBike.location.coordinates[1],
                            lng: selectedBike.location.coordinates[0]
                        }}
                        onCloseClick={() => {setSelectedBike(null)}}
                    ><>
                        <p>{selectedBike.name}</p>
                        <p>Batterinivå: {selectedBike.batterylevel}%</p>
                        <button onClick={() => {StartTrip()}}>Lås upp</button>
                     </>
                    </InfoWindowF>
                </> : null}
                </>
            </GoogleMap>

    </div>
  )
};

export default Map;