import React from 'react';
import Logo from '../../assets/logo.png';
import '../../style/mytriptab.css';
import '../../style/buttons.css';

function TripEnded({ tripInfo }) {
    return (
        <div className='mytrip-container'>
            <img
                src={Logo}
                alt="logo"
                className="logo"
            />

            <div className='trip-container'>
                <div style={{textAlign: 'center'}}><h1>Resa avslutad</h1></div>
                <p>
                    <b>Tid: </b>
                    {tripInfo.duration.minutes} minuter {tripInfo.duration.seconds} sekunder
                </p>
                <p><b>Kostnad:</b> {tripInfo.cost} kr</p>

            </div>

            <div></div>
            <div></div>
        </div>
    );
}

export default TripEnded;
