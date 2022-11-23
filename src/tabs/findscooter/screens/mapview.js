import React from 'react';
import Map from '../components/map.js';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

function MapView({ setScreen, city, coordinates, setTab }) {
    return (
        <div className='findscooter-container'>
            <div className='header-flex'>
                <div style={{textAlign: 'left'}}>
                    <button onClick={() => {
                        setScreen("firstscreen");
                    }} className='back-button'>Tillbaka</button>
                </div>

                <h1>{city}</h1>

                <div></div>
            </div>

            <p>Välj en scooter:</p>

            <div className='map-container'>
                <Map coordinates={coordinates} setTab={setTab}/>
            </div>
        </div>
    );
}

export default MapView;
