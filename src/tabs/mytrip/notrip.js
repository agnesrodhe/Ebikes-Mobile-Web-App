import React from 'react';
import Logo from '../../assets/logo.png';
import '../../style/mytriptab.css';
import '../../style/buttons.css';

function NoTrip() {
    return (
        <div className='mytrip-container'>
            <img
                src={Logo}
                alt="logo"
                className="logo"
            />

            <h1>Inga pågående resor</h1>

            <div></div>
        </div>
    );
}

export default NoTrip;
