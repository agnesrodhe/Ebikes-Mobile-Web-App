import React from 'react';
import Map from '../components/map.js';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

function MapView({ user, setScreen, city, coordinates, setTab, priceList }) {
    return (
        <div className='findscooter-container'>
            <div className='header-flex'>
                <div style={{textAlign: 'left'}}>
                    <button onClick={() => {
                        setScreen("firstscreen");
                    }} className='back-button-map'>Tillbaka</button>
                </div>

                <h1>{city.name}</h1>

                <div></div>
            </div>

            <p>Välj en scooter:</p>

            <div className='map-container-findscooter'>
                <Map
                    coordinates={coordinates}
                    user={user}
                    setTab={setTab}
                    city={city}
                    priceList={priceList}/>
            </div>
        </div>
    );
}

export default MapView;
