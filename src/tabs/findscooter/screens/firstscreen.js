import React from 'react';
import Logo from '../../../assets/logo.png';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

function FirstScreen({ setScreen, setCity, setCoordinates }) {
    function goToMap(city, coordinates) {
        setCity(city);
        setCoordinates(coordinates);
        setScreen("map");
    }

    return (
        <div className='findscooter-container'>
            <img src={Logo} alt="logo" className="logo-findscooter-index" />

            <h1>Välkommen Förnamn!</h1>

            <div className='findscooter-index-buttons-container'>
                <p>Välj stad för att hitta en elscooter:</p>

                <button onClick={() => {
                    goToMap(
                        "Visby",
                        {lat: 57.629472, lng: 18.309996}
                    );
                }} className='main-button'>
                    <h4>Visby</h4>
                </button>

                <button onClick={() => {
                    goToMap(
                        "Västerås",
                        {lat: 59.611060, lng: 16.544369}
                    );
                }} className='main-button'>
                    <h4>Västerås</h4>
                </button>

                <button onClick={() => {
                    goToMap(
                        "Lund",
                        {lat: 55.703571, lng: 13.191943}
                    );
                }} className='main-button'>
                    <h4>Lund</h4>
                </button>
            </div>

            <div className='findscooter-index-placeholder'></div>
        </div>
    );
}

export default FirstScreen;
