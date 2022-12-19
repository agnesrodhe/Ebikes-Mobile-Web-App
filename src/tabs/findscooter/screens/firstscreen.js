import React, { useState } from 'react';
import citiesModel from '../../../models/cities';
import Logo from '../../../assets/logo.png';
import StartImg from '../../../assets/start_img.png';
import '../../../style/findscootertab.css';
import '../../../style/buttons.css';

function FirstScreen({ user, priceList, setScreen, setCity, setCoordinates }) {
    const [showPriceList, setShowPriceList] = useState(false);

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

            <div className='findscooter-index-buttons-container white-background'>
                {!showPriceList ?
                    <>
                        <h4>Välj stad:</h4>

                        <button onClick={() => {
                            goToMap(
                                "Visby",
                                {lat: 57.629472, lng: 18.309996}
                            );
                        }} className='main-button-green'>
                            <h4>Visby</h4>
                        </button>

                        <button onClick={() => {
                            goToMap(
                                "Borlänge",
                                {lat: 60.485552, lng: 15.411948}
                            );
                        }} className='main-button-green'>
                            <h4>Borlänge</h4>
                        </button>

                        <button onClick={() => {
                            goToMap(
                                "Lund",
                                {lat: 55.703571, lng: 13.191943}
                            );
                        }} className='main-button-green'>
                            <h4>Lund</h4>
                        </button>
                    </>
                    :
                    <>
                        <h4>Prislista</h4>

                        <div className='pricelist-container'>
                            <table className='price-table'>
                                <tbody className='price-row'>
                                    <tr>
                                        <th>Startavgift</th>
                                        <td><b>{priceList.startfee}kr</b></td>
                                    </tr>
                                    <tr>
                                        <th>Minuttaxa</th>
                                        <td><b>{priceList.minutetaxa.toFixed(2)}kr</b></td>
                                    </tr>
                                </tbody>
                            </table><br></br>
                            <p>
                                Parkering utanför parkeringszonerna
                                medför en <b>parkeringsavgift</b> på
                                <b> {priceList.penaltyfee}kr</b>.
                            </p>
                            <p>
                                Om resan påbörjas och avslutas inom parkeringszonerna
                                 ges en <b>bonus</b> på <b>{priceList.bonus}kr </b>
                                  som dras från slutsumman.
                            </p>
                        </div>
                    </>
                }

                {showPriceList}
            </div>

            {!showPriceList ?
                <button onClick={() => {
                    setShowPriceList(true);
                }} className='small-button-orange'>
                    <h4>Prislista</h4>
                </button>
                :
                <button onClick={() => {
                    setShowPriceList(false);
                }} className='small-button-orange'>
                    <h4>Tillbaka</h4>
                </button>
            }

            <img src={StartImg} alt="illustration" className="findscooter-img" />
        </div>
    );
}

export default FirstScreen;
