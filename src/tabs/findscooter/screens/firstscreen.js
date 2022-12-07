import React from 'react';
import citiesModel from '../../../models/cities';
import Logo from '../../../assets/logo.png';
import StartImg from '../../../assets/start_img.png';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

function FirstScreen({ user, setScreen, setCity, setCoordinates }) {
    async function goToMap(city, coordinates) {
        const allCities = await citiesModel.getAllCities();

        const choosenCity = allCities.filter((oneCity) => {
            if (oneCity.name === city) {
                return oneCity;
            }
        });

        setCity(choosenCity[0]);
        setCoordinates(coordinates);
        setScreen("map");
    }

    return (
        <div className='findscooter-container'>
            <img src={Logo} alt="logo" className="logo-findscooter-index" />

            <h1>Välkommen {user.firstName || user.username}!</h1>

            <div className='findscooter-index-buttons-container'>
                <h4>Välj stad:</h4>

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
                        "Borlänge",
                        {lat: 60.485552, lng: 15.411948}
                    );
                }} className='main-button'>
                    <h4>Borlänge</h4>
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

            <img src={StartImg} alt="illustration" className="findscooter-img" />
        </div>
    );
}

export default FirstScreen;
