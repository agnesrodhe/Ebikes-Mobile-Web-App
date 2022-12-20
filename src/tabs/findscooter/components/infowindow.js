import React, { useState, useEffect } from 'react';
import { InfoWindowF } from '@react-google-maps/api';

function InfoWindow({ user, selectedBike, setSelectedBike, priceList, setTab, StartTrip }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [balanceLimit, setBalanceLimit] = useState(null);

    useEffect(() => {
        setBalanceLimit(priceList.startfee + priceList.penaltyfee + 20*priceList.minutetaxa);
    }, []);

    useEffect(() => {
        setShowConfirm(false);
    }, [selectedBike]);

    return (<>
        <InfoWindowF
            position={{
                lat: (selectedBike.location.coordinates[1] + 0.000040),
                lng: selectedBike.location.coordinates[0]
            }}
            onCloseClick={() => {
                setSelectedBike(null);
                setShowConfirm(false);
            }}
        >
            <>
                <div className='info-window-container'>
                    <p><b>{selectedBike.name}</b></p>
                    <p>Batterinivå: {selectedBike.batterylevel}%</p>
                    <p style={{color: 'red'}}>{errorMessage}</p>

                    {!errorMessage ?
                        <>
                            {!showConfirm ?
                                <button
                                    className='unlock-button'
                                    onClick={() => setShowConfirm(true)}>
                                    Hyr
                                </button>
                                :
                                <>
                                    <h4>Påbörja resa?</h4>
                                    <button
                                        className='unlock-button'
                                        onClick={() => setShowConfirm(false)}>
                                        Nej
                                    </button>

                                    <button
                                        className='unlock-button'
                                        onClick={() => {
                                            if (localStorage.getItem('trip')) {
                                                setErrorMessage("Du har redan en pågående resa");
                                                return;
                                            }
                                            if (!user.balance || user.balance < balanceLimit) {
                                                setErrorMessage(
                                                    `Du måste ha minst ${balanceLimit}kr på ditt
                                                     konto för att påbörja en resa.`
                                                );
                                                return;
                                            }
                                            StartTrip();
                                        }}>
                                        Ja
                                    </button>
                                </>
                            }
                        </>
                        :
                        <button
                            className='unlock-button'
                            onClick={() => setTab(2)}>
                            Min sida
                        </button>
                    }
                </div>
            </>
        </InfoWindowF>
    </>);
}

export default InfoWindow;
