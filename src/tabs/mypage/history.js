import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function History({ user, setDisplay }) {
    const [history] = useState([...user.history].reverse());

    return (
        <div className='mytrip-container'>
            <img
                src={Logo}
                alt="logo"
                className="logo"
            />

            <div className='page-container'>
                <div style={{textAlign: 'left'}}>
                    <button onClick={() => {
                        setDisplay("firstscreen");
                    }} className='back-button'>Tillbaka</button>
                </div>

                <div className="history-title"><h1>Resehistorik</h1></div>

                <div className='history-container'>
                    {history.map((trip, index) => {
                        return  <table className='history-table' key={index}>
                            <tbody className='one-trip'>
                                <tr>
                                    <th>Stad</th>
                                    <td>{trip.city}</td>
                                </tr>
                                <tr>
                                    <th>Datum</th>
                                    <td>{new Date(trip.startTime).toDateString()}</td>
                                </tr>
                                <tr>
                                    <th>Starttid</th>
                                    <td>
                                        {new Date(trip.startTime).getHours() < 10 && "0"}
                                        {new Date(trip.startTime).getHours()}:
                                        {new Date(trip.startTime).getMinutes() < 10 && "0"}
                                        {new Date(trip.startTime).getMinutes()}:
                                        {new Date(trip.startTime).getSeconds() < 10 && "0"}
                                        {new Date(trip.startTime).getSeconds()}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Stoptid</th>
                                    <td>
                                        {new Date(trip.stopTime).getHours() < 10 && "0"}
                                        {new Date(trip.stopTime).getHours()}:
                                        {new Date(trip.stopTime).getMinutes() < 10 && "0"}
                                        {new Date(trip.stopTime).getMinutes()}:
                                        {new Date(trip.stopTime).getSeconds() < 10 && "0"}
                                        {new Date(trip.stopTime).getSeconds()}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Längd</th>
                                    <td>{trip.duration.minutes}m {trip.duration.seconds}s</td>
                                </tr>
                                <tr>
                                    <th>Kostnad</th>
                                    <td>{trip.cost} kr</td>
                                </tr>
                            </tbody>
                        </table>;
                    })}
                </div>
            </div>

            <div></div>
            <div></div>
        </div>
    );
}

export default History;
