import React, { useState } from 'react';
import { InfoWindowF } from '@react-google-maps/api';

function InfoWindow({ user, selectedBike, setSelectedBike, StartTrip }) {
    const [errorMessage, setErrorMessage] = useState('');

    return (<>
        <InfoWindowF
            position={{
                lat: (selectedBike.location.coordinates[1] + 0.000040),
                lng: selectedBike.location.coordinates[0]
            }}
            onCloseClick={() => {setSelectedBike(null);}}
        >
            <>
                <div style={{
                    padding: '10px 5px 30px 0',
                    maxWidth: '200px'
                }}>
                    <p>{selectedBike.name}</p>
                    <p>Batterinivå: {selectedBike.batterylevel}%</p>
                    <p style={{color: 'red'}}>{errorMessage}</p>
                    <button onClick={() => {
                        if (localStorage.getItem('trip')) {
                            setErrorMessage("Du har redan en pågående resa");
                            return;
                        }
                        if (user.balance < 50) {
                            setErrorMessage(
                                "Du måste ha minst 50kr på ditt konto för att påbörja en resa."
                            );
                            return;
                        }
                        StartTrip();
                    }}>Lås upp</button>
                </div>
            </>
        </InfoWindowF>
    </>);
}

export default InfoWindow;
